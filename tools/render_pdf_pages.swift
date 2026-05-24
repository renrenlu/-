import AppKit
import PDFKit

let args = CommandLine.arguments
guard args.count == 3 else {
    fputs("Usage: render_pdf_pages.swift input.pdf output-dir\n", stderr)
    exit(1)
}

let inputURL = URL(fileURLWithPath: args[1])
let outputURL = URL(fileURLWithPath: args[2], isDirectory: true)

guard let document = PDFDocument(url: inputURL) else {
    fputs("Cannot open PDF\n", stderr)
    exit(1)
}

try FileManager.default.createDirectory(at: outputURL, withIntermediateDirectories: true)

for index in 0..<document.pageCount {
    guard let page = document.page(at: index) else { continue }
    let bounds = page.bounds(for: .mediaBox)
    let scale: CGFloat = 1.6
    let size = NSSize(width: bounds.width * scale, height: bounds.height * scale)
    let image = NSImage(size: size)

    image.lockFocus()
    guard let context = NSGraphicsContext.current?.cgContext else {
        image.unlockFocus()
        continue
    }

    NSColor.white.setFill()
    context.fill(CGRect(origin: .zero, size: size))
    context.saveGState()
    context.scaleBy(x: scale, y: scale)
    page.draw(with: .mediaBox, to: context)
    context.restoreGState()
    image.unlockFocus()

    guard
        let tiff = image.tiffRepresentation,
        let bitmap = NSBitmapImageRep(data: tiff),
        let png = bitmap.representation(using: .png, properties: [:])
    else { continue }

    let filename = String(format: "page-%02d.png", index + 1)
    try png.write(to: outputURL.appendingPathComponent(filename))
}
