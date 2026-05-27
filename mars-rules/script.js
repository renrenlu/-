const generalRules = [
  {
    id: "general-info",
    title: "一、一般信息",
    tag: "章节",
    page: 4,
    meta: ["工程技能赛项目标", "小学组 / 中学组"],
    body: [
      "2026 年工程技能赛项由各种比赛组成，年度主题基于社会热点设计。团队需要设计机器人，在比赛环境中解决任务和挑战。",
      "赛项强调科学、技术、工程、艺术和数学能力，鼓励年轻人发展审辩式思维和 21 世纪技能。",
      "工程技能赛项包括火星探险小学组和火星探险中学组。"
    ]
  },
  {
    id: "event-info",
    title: "（一）世界机器人大会—青少年机器人设计与信息素养大赛—工程技能赛项",
    tag: "章节",
    page: 4,
    meta: ["年度主题", "工程技能", "STEAM"],
    body: [
      "2026 年工程技能赛项由各种比赛组成。比赛年度主题基于社会热点话题设计，各年龄段团队需完成难度不同的挑战任务。",
      "团队的任务是设计一个机器人，解决比赛环境中的各种任务和挑战。任务聚焦科学、技术、工程、艺术和数学，鼓励年轻人发展审辩式思维和 21 世纪技能。",
      "2026 年工程技能赛项包括工程技能赛项——火星探险——小学组，以及工程技能赛项——火星探险——中学组。"
    ]
  },
  {
    id: "team",
    title: "二、团队定义、期望",
    tag: "章节",
    page: 5,
    meta: ["团队组成", "公平比赛", "独立完成"],
    body: [
      "本章说明参赛团队年龄组、团队组成以及比赛中的行为期望。",
      "团队应公平比赛，尊重其他队伍、教练、裁判和比赛组织者。机器人的建构和程序编写只能由团队队员完成。"
    ]
  },
  {
    id: "team-definition",
    title: "（一）团队定义",
    tag: "章节",
    page: 5,
    meta: ["小学组 9-12 周岁", "中学组 12-16 周岁"],
    body: [
      "小学组团队由两名 9 周岁至 12 周岁的学生组成。",
      "中学组团队由两名 12 周岁至 16 周岁的学生组成。",
      "学生不需要来自同一所学校，但同一团队所有队员必须在同一年龄组。"
    ]
  },
  {
    id: "team-expectation",
    title: "（二）团队的期望",
    tag: "章节",
    page: 5,
    meta: ["公平比赛", "队员独立完成"],
    body: [
      "各队应公平比赛，尊重其他队伍、教练、裁判和比赛组织者，并遵守比赛规则。",
      "机器人的建构和程序编写只能由团队队员完成。教练可以支持团队组织和后勤，但不能参与建构和程序编写。",
      "比赛日调试或竞赛期间，教练和导师不得与团队队员沟通。"
    ]
  },
  {
    id: "rules-chapter",
    title: "三、赛项规则",
    tag: "赛项规则",
    page: 5,
    meta: ["词语解释", "场地材料", "比赛流程"],
    body: [
      "本章包含词语解释、场地规格和材料、设备材料及控制方式，以及火星探险赛项的比赛流程、计分、犯规和争议处理规则。",
      "参赛队伍应优先按照文字规则理解和执行比赛要求。"
    ]
  },
  {
    id: "terms",
    title: "（一）词语解释",
    tag: "赛项规则",
    page: 5,
    meta: ["机器人", "设备", "场地", "营救"],
    body: [
      "规则定义了机器人、设备、场地、比赛、任务道具模型、策略物模型、团队器材、出发、设备进入启动区和营救等关键词。",
      "营救是团队因主动或被动原因用手将设备带回任意启动区重新启动的行为。首次营救不扣分，从第二次起每次从营救奖励中减 8 分。",
      "设备未完全进入启动区时队员触碰设备、设备卡死、脱线或脱离活动场地等情况，都可能触发营救。"
    ]
  },
  {
    id: "field",
    title: "（二）场地的规格和材料",
    tag: "赛项规则",
    page: 7,
    meta: ["1140mm x 2360mm", "2 个启动区", "13 个任务区"],
    body: [
      "比赛在赛事场地膜中完成。场地膜设有方向、启动区、任务区和辅助线。",
      "场地膜规格为 1140mm x 2360mm，设有 2 个启动区、13 个任务区和若干辅助线。",
      "场地膜允许有误差，赛台或地面材质、光照、褶皱等环境因素可能变化，参赛队伍应在设计方案时考虑应对措施。"
    ]
  },
  {
    id: "materials",
    title: "（三）设备材料及控制方式",
    tag: "赛项规则",
    page: 8,
    meta: ["1 台机器人", "自主模式", "禁止遥控"],
    body: [
      "团队仅允许使用规则指定参数的控制器、电机、传感器、电池、搭建材料和编程软件。",
      "每支队伍仅可使用 1 台机器人，并与不同机械臂组装成用于完成任务的设备。",
      "比赛期间设备必须以自主模式运行，不允许使用无线通信、遥控或有线方式启动/控制机器人。"
    ]
  },
  {
    id: "mission-rules",
    title: "（四）工程技能赛项——火星探险（小学/中学组）赛项规则",
    tag: "流程规则",
    page: 10,
    meta: ["设备启动前", "比赛期间", "计分与争议"],
    body: [
      "本节规定设备启动前、启动时、比赛期间、比赛结束、计分、犯规和争议处理等完整比赛流程。",
      "团队应在启动区、营救、任务道具移动、自主运行和停止比赛等关键节点严格遵守本节规则。"
    ]
  },
  {
    id: "before-start",
    title: "1.设备启动前",
    tag: "流程规则",
    page: 10,
    meta: ["检录检查", "启动区限制", "赛前准备"],
    body: [
      "裁判或工作人员会依据设备材料参数、控制方式、机器人规格和机械臂规格进行检查。不符合要求需现场整改，正式比赛前仍未完成整改的，每轮成绩扣 80 分。",
      "每次启动前，设备整体的垂直投影不可以超出启动区。若启动前超出启动区，该设备自离开至返回启动区期间完成的所有任务不计分。",
      "赛前准备中，团队必须使用比赛提供的任务道具模型，不得携带自己的任务道具模型到比赛区。"
    ]
  },
  {
    id: "start",
    title: "2.设备启动时",
    tag: "流程规则",
    page: 11,
    meta: ["倒计时开始", "150 秒"],
    body: [
      "裁判确认团队准备好后，将发出 5、4、3、2、1、开始的倒计时口令。",
      "听到开始命令后，团队队员可以启动设备，计时开始。",
      "每轮比赛时间为 150 秒。开始命令前启动设备视为误启动，需拿回启动区重新启动，但计时器不清零。"
    ]
  },
  {
    id: "during",
    title: "3.设备比赛期间",
    tag: "流程规则",
    page: 12,
    meta: ["自主运行", "启动区触碰", "任务道具规则"],
    body: [
      "比赛期间，设备必须自主运行并自行完成任务，禁止任何无线通信、遥控和有线控制。",
      "设备完全进入启动区后，团队才允许在启动区触碰设备、选择或更换机械臂、策略物模型、任务道具模型、传感器或电机、切换程序。",
      "需要移动的任务道具模型仅限由参赛设备完成转移操作，含营救环节在内，禁止手动从任一启动区转移至其他启动区。"
    ]
  },
  {
    id: "finish",
    title: "4.比赛结束",
    tag: "流程规则",
    page: 13,
    meta: ["150 秒结束", "停止口令", "三次警告"],
    body: [
      "比赛会在 150 秒时间结束、团队出现第三次常规警告，或团队口头呼喊停止并同步举手示意时结束。",
      "裁判喊停止后，团队应立即停止自主状态的设备。因停止不及时造成的得分无效。",
      "裁判确认得分前，任何人严禁触碰、挪动场上的得分道具或改变得分状态。"
    ]
  },
  {
    id: "score",
    title: "5.关于计分",
    tag: "流程规则",
    page: 14,
    meta: ["按结束状态计分", "最佳单轮成绩", "签字确认"],
    body: [
      "每轮比赛结束后，通常根据比赛结束时场地上的结果判定成绩。如果已完成任务或任务道具在比赛结束前被破坏，则无法得到该任务分数。",
      "两轮比赛结束后，按每支参赛队成绩最佳的单轮成绩确定排名。",
      "成绩记录在计分表上后，团队需要签字确认。一旦签字确认，就无法再提出异议。"
    ]
  },
  {
    id: "violation",
    title: "6.关于犯规和取消比赛资格",
    tag: "流程规则",
    page: 15,
    meta: ["常规警告", "第三次成绩为零"],
    body: [
      "比赛期间设备还未进入启动区时队员触碰设备、触碰启动区外任务道具模型、故意损坏场地、不听从裁判指令等情况，会受到常规警告。",
      "若出现第三次常规警告，该轮比赛成绩为零。",
      "犯规和取消比赛资格的最终解释权由裁判长所有。"
    ]
  },
  {
    id: "dispute",
    title: "7.关于争议",
    tag: "流程规则",
    page: 15,
    meta: ["裁判长最终裁决", "文字高于图片"],
    body: [
      "规则中如有未尽事项，以赛事承办单位发布的赛事秩序册或裁判委员会现场公布为准。",
      "规则、任务或场地设置的调整和澄清会在赛季期间更新，并取代之前相关材料。",
      "比赛中如有不确定性，由裁判做出最终裁决；不能明确裁决时，裁判应做出有利于团队的裁决。文字权威性始终高于图片。"
    ]
  },
  {
    id: "props",
    title: "四、任务道具、任务介绍",
    tag: "任务介绍",
    page: 16,
    meta: ["任务道具", "任务描述"],
    body: [
      "本章包含任务道具和位置说明，以及 15 个任务的完整任务描述与得分规则。",
      "建议先查看任务道具和位置说明，再查看下方任务标题。"
    ]
  },
  {
    id: "props-location",
    title: "（一）任务道具和位置说明",
    tag: "任务介绍",
    page: 16,
    meta: ["模型名称", "位置说明", "道具描述"],
    body: [
      "本节列出螺旋桨支架、螺旋桨、火箭发射平台、固体燃料、矿石、风帆车、平衡阀、光伏设备、保龄球瓶、土壤样本、弹射装置、火星车、摇床、VHF 天线、营地、生命微仓等道具。",
      "部分任务道具需固定在场地膜标定位置，部分任务道具需要被设备运输或操作。",
      "图片中任务道具的积木元件颜色可能与套装中的积木元件颜色不符，以现场与规则说明为准。"
    ]
  },
  {
    id: "task-description",
    title: "（二）任务描述",
    tag: "任务介绍",
    page: 20,
    meta: ["15 个任务", "得分规则", "最高分"],
    body: [
      "本节逐项说明实验准备、燃料补给、矿石运输、受风实验、极限对接、光伏调试、保龄社交、寻找生命、弹射运输、矿石分选、通信优化、机器检修、营地维护、生命微仓和营救奖励。",
      "下方“任务标题”索引已按 PDF 顺序整理，可直接点击查看对应任务。"
    ]
  },
  {
    id: "space",
    title: "五、场地膜与赛台之间的空间关系",
    tag: "空间关系",
    page: 34,
    meta: ["赛台", "场地膜", "空间位置"],
    body: [
      "本节说明场地膜与赛台之间的空间关系，适合在搭建练习场和赛前确认场地时查看。",
      "训练与比赛时应注意场地膜铺设、边界和赛台空间关系，避免因场地条件差异影响设备运行。"
    ]
  },
  {
    id: "score-sheet",
    title: "计分表",
    tag: "附表",
    page: 35,
    meta: ["总分 410", "两轮记录", "队员与裁判签名"],
    body: [
      "计分表汇总 15 个任务的得分项、分值、最高分、第一轮与第二轮记录。",
      "任务最高分合计为 410 分。计分表包含队伍呼号、比赛完成时间、队员签名和裁判签名。"
    ]
  }
];

const taskRules = [
  {
    id: "task-1",
    title: "1. 实验准备",
    tag: "任务",
    page: 20,
    meta: ["最高分 15"],
    body: [
      "比赛开始前，螺旋桨搭载在支架上。比赛开始后，设备需要将螺旋桨从支架上取下来，设备可以暂时将螺旋桨转移到任意启动区。",
      { score: "比赛结束时，螺旋桨与支架没有任何接触，得 15 分。" }
    ]
  },
  {
    id: "task-2",
    title: "2. 燃料补给",
    tag: "任务",
    page: 20,
    meta: ["最高分 25"],
    body: [
      "比赛开始前，燃料框处于最高位置，两个固体燃料分别放置于场地膜北侧绿色标定位置。比赛开始后，设备需要收集固体燃料并放置在发射井上端燃料框内。",
      { score: "成功添加一个固体燃料且相关道具未接触团队器材，得 10 分；成功添加两个，得 25 分。" }
    ]
  },
  {
    id: "task-3",
    title: "3. 矿石运输",
    tag: "任务",
    page: 22,
    meta: ["最高分 35"],
    body: [
      "设备需将气动阀门指针拨至西侧灰色管路方向，随后转动气泵开关抬升活塞，使矿石球体借助重力沿滑道自然滚落到场地膜上。",
      { score: "仅完成阀门指针切换得 10 分；完成切换并使矿石自然滚落到场地膜上，得 35 分。" }
    ]
  },
  {
    id: "task-4",
    title: "4. 受风实验",
    tag: "任务",
    page: 23,
    meta: ["最高分 40"],
    body: [
      "团队完成任务一后，方可将取下的螺旋桨安装到设备上，通过螺旋桨产生的风驱动风帆车。比赛过程中，设备或队员不得触碰风帆车。",
      { score: "风帆车前轮投影在一星、二星、三星、冠军区域分别得 10、20、30、40 分；触碰风帆车则本任务 0 分。" }
    ]
  },
  {
    id: "task-5",
    title: "5. 极限对接",
    tag: "任务",
    page: 24,
    meta: ["最高分 20"],
    body: [
      "比赛开始前，平衡阀绿色把手朝向东方，压力表指针在最低刻度。比赛开始后，设备必须转动平衡阀。",
      { score: "压力表指针针尖部分指向 315 刻度线，得 20 分。判定存疑时按任务完成计分。" }
    ]
  },
  {
    id: "task-6",
    title: "6. 光伏调试",
    tag: "任务",
    page: 25,
    meta: ["最高分 25"],
    body: [
      "设备需要调整光伏设备与支架状态，使光伏板高度和支架方位满足规则要求。",
      { score: "光伏板顶端高度超过支架顶端且未接触团队器材，得 10 分；光伏支架调整至红色标线左侧且投影未落于标线上，同时未接触团队器材，得 15 分。" }
    ]
  },
  {
    id: "task-7",
    title: "7. 保龄社交",
    tag: "任务",
    page: 26,
    meta: ["最高分 30"],
    body: [
      "设备仅在完成任务三后，方可使用已获取的球体道具撞击保龄球瓶。释放或发射球体时，设备投影需部分或完全处于菱形区域内。",
      { score: "每有一个保龄球瓶被指定方式撞倒且未接触团队器材，得 5 分。释放位置不符合要求或非指定方式撞倒均不计分。" }
    ]
  },
  {
    id: "task-8",
    title: "8. 寻找生命",
    tag: "任务",
    page: 28,
    meta: ["最高分 30"],
    body: [
      "三个土壤样本道具随机放置在场地膜指定位置。设备需要收集土壤样本并将它们运送至实验室，也允许带回任意启动区。",
      { score: "土壤道具离开初始标定位置但未送至实验室，得 5 分/个；运送至实验室区域内且未接触实验室外侧场地膜及团队器材，得 10 分/个。" }
    ]
  },
  {
    id: "task-9",
    title: "9. 弹射运输",
    tag: "任务",
    page: 29,
    meta: ["最高分 25"],
    body: [
      "设备需拉出弹射装置拉杆，触发弹射机构，将火星车从起始位置平稳弹射。若火星车以非指定方式完全脱离初始标定位置，本任务不计分。",
      { score: "成功触发火星车弹射，弹射后火星车投影完全脱离初始标定位置，且弹射装置与火星车均未接触团队器材，得 25 分。" }
    ]
  },
  {
    id: "task-10",
    title: "10. 矿石分选",
    tag: "任务",
    page: 30,
    meta: ["最高分 20"],
    body: [
      "比赛开始前，摇床为左低右高，矿石球体放置于摇床西侧低位。比赛开始后，设备需要将摇床调整至东低西高，使矿石滚落至东侧低处。",
      { score: "摇床调整至东低西高，矿石滚落至摇床东侧低处，且摇床与矿石道具均未接触团队器材，得 20 分。球体掉落到场地膜上不计分。" }
    ]
  },
  {
    id: "task-11",
    title: "11. 通信优化",
    tag: "任务",
    page: 30,
    meta: ["最高分 40"],
    body: [
      "比赛开始前，支架高侧朝向南方，矮侧朝向北方，VHF 天线位于支架最底端。比赛开始后，设备需要将天线提升至支架顶端。",
      { score: "设备将天线提升至支架顶端，且支架和天线道具没有接触团队器材，得 40 分。" }
    ]
  },
  {
    id: "task-12",
    title: "12. 机器检修",
    tag: "任务",
    page: 31,
    meta: ["最高分 35"],
    body: [
      "天线支架下方为简易维修区，用于对基地外设备进行紧急维护和常规保养。",
      "比赛开始后，设备须沿南北轴向，以任一方向完全穿过支架下方的简易维修区。比赛结束时，如果设备垂直投影部分或完全在支架区域内，本任务不予计分。",
      { score: "设备沿南北轴向完全穿过支架下方，从支架一侧进入并从另一侧完全离开支架区域，得 35 分。" }
    ]
  },
  {
    id: "task-13",
    title: "13. 营地维护",
    tag: "任务",
    page: 32,
    meta: ["最高分 20"],
    body: [
      "营地核心承重结构因极端温差出现金属疲劳与变形，需要机器人进行修复。",
      "比赛开始前，营地承重结构处于明显非规范形变状态。比赛开始后，设备需要将承重结构修复成规范形态。",
      { score: "设备将营地承重结构修复成规范形态，且营地没有接触任何团队器材，得 20 分。" }
    ]
  },
  {
    id: "task-14",
    title: "14. 生命微仓",
    tag: "任务",
    page: 32,
    meta: ["最高分 10"],
    body: [
      "生命微仓可搭载土壤样本，用于验证火星土壤的生命支持能力。比赛开始前，1 个生命微仓放置于任一启动区内。",
      { score: "生命微仓被运送至实验室区域内，且未接触实验室外侧场地膜及任何团队器材，得 10 分。生命微仓不能与土壤样本道具硬连接。" }
    ]
  },
  {
    id: "task-15",
    title: "15. 营救奖励",
    tag: "任务",
    page: 35,
    meta: ["最高分 40"],
    body: [
      "比赛中允许营救，但营救会影响奖励分。",
      { score: "第一次营救不扣分，以后每次营救扣 8 分，扣完后不再减分；对应分值为 40、32、24、16、8、0。" }
    ]
  }
];

const allRules = [...generalRules, ...taskRules];
const generalIndex = document.querySelector("#generalIndex");
const taskIndex = document.querySelector("#taskIndex");
const title = document.querySelector("#ruleTitle");
const tag = document.querySelector("#ruleTag");
const meta = document.querySelector("#ruleMeta");
const body = document.querySelector("#ruleBody");
const pdfLink = document.querySelector("#rulePdfLink");
const card = document.querySelector("#ruleCard");
const tableWrap = document.querySelector("#ruleTable");
const pageImage = document.querySelector("#rulePageImage");
const pageCaption = document.querySelector("#rulePageCaption");
const pdfObject = document.querySelector("#pdfObject");
const modal = document.querySelector("#ruleModal");
const modalSheet = document.querySelector(".modal-sheet");
const modalTag = document.querySelector("#modalTag");
const modalTitle = document.querySelector("#modalTitle");
const modalMeta = document.querySelector("#modalMeta");
const modalBody = document.querySelector("#modalBody");
const modalTable = document.querySelector("#modalTable");
const modalPageImage = document.querySelector("#modalPageImage");
const modalPageCaption = document.querySelector("#modalPageCaption");
const modalPdfLink = document.querySelector("#modalPdfLink");
let activePdfPageUrl = "../mars-exploration-rules.pdf#view=FitH";

document.querySelectorAll(".intro, .stat").forEach((element) => element.remove());

const scoreTables = {
  "task-1": [["比赛结束时，螺旋桨与支架没有任何接触", "15", "15"]],
  "task-2": [
    ["成功添加一个固体燃料，且火箭发射平台和固体燃料没有接触任何团队器材", "10", "25"],
    ["成功添加两个固体燃料，且火箭发射平台和固体燃料没有接触任何团队器材", "25", "25"]
  ],
  "task-3": [
    ["仅将气动阀门指针拨至西侧灰色管路方向", "10", "35"],
    ["切换阀门并转动气泵开关，矿石借助重力沿滑道自然滚落到场地膜上", "35", "35"]
  ],
  "task-4": [
    ["风帆车前轮投影部分或完全在一星区域内", "10", "40"],
    ["风帆车前轮投影部分或完全在二星区域内", "20", "40"],
    ["风帆车前轮投影部分或完全在三星区域内", "30", "40"],
    ["风帆车前轮投影部分或完全在冠军区域内", "40", "40"],
    ["比赛过程中设备或队员触碰风帆车", "0", "40"]
  ],
  "task-5": [["压力表指针针尖部分指向 315 刻度线", "20", "20"]],
  "task-6": [
    ["光伏板垂直顶端高度超过光伏支架垂直顶端高度，且未接触团队器材", "10", "25"],
    ["光伏支架停留至红色标线左侧，投影未落于红色标线上，且未接触团队器材", "15", "25"]
  ],
  "task-7": [
    ["每有一个保龄球瓶被设备释放/发射的球体撞倒，且没有接触任何团队器材", "5/个", "30"],
    ["释放/发射球体时，设备投影没有处于菱形区域内", "0", "30"],
    ["保龄球瓶并非设备释放/发射的球体撞击所致", "0", "30"]
  ],
  "task-8": [
    ["土壤道具完全离开初始标定位置，但未被运送至实验室", "5/个", "30"],
    ["土壤道具被运送至实验室区域内，且未接触实验室外侧场地膜及团队器材", "10/个", "30"]
  ],
  "task-9": [["设备拉出拉杆并成功触发火星车弹射，火星车投影完全脱离初始标定位置，且相关道具未接触团队器材", "25", "25"]],
  "task-10": [["摇床调整至东低西高，矿石滚落至摇床东侧低处，且摇床与矿石道具均未接触团队器材", "20", "20"]],
  "task-11": [["设备将天线提升至支架顶端，且支架和天线道具没有接触团队器材", "40", "40"]],
  "task-12": [["设备沿南北轴向完全穿过支架下方，从支架一侧进入并从另一侧完全离开支架区域", "35", "35"]],
  "task-13": [["设备将营地承重结构修复成规范形态，且营地没有接触任何团队器材", "20", "20"]],
  "task-14": [["生命微仓被运送至实验室区域内，且未接触实验室外侧场地膜及任何团队器材", "10", "10"]],
  "task-15": [["第一次营救不扣分，以后每次营救扣 8 分，扣完后不再减分", "40 / 32 / 24 / 16 / 8 / 0", "40"]]
};

function makeChip(rule) {
  const button = document.createElement("button");
  button.className = "rule-chip";
  button.type = "button";
  button.dataset.rule = rule.id;
  button.textContent = rule.title;
  button.addEventListener("click", () => {
    activateRule(rule.id);
    openModal();
  });
  return button;
}

function renderIndexes() {
  generalRules.forEach((rule) => generalIndex.appendChild(makeChip(rule)));
  taskRules.forEach((rule) => taskIndex.appendChild(makeChip(rule)));
}

function activateRule(ruleId, moveFocus = false) {
  const rule = allRules.find((item) => item.id === ruleId) || allRules[0];
  document.querySelectorAll(".rule-chip").forEach((chip) => {
    chip.classList.toggle("is-active", chip.dataset.rule === rule.id);
  });

  tag.textContent = rule.tag;
  title.textContent = rule.title;
  const pdfPageUrl = `../mars-exploration-rules.pdf#page=${rule.page}&zoom=page-fit`;
  activePdfPageUrl = pdfPageUrl;
  pdfLink.href = "#pdf";
  pdfLink.textContent = `定位原文第 ${rule.page} 页`;
  pdfLink.onclick = (event) => {
    event.preventDefault();
    jumpToPdfPage();
  };

  meta.innerHTML = "";
  rule.meta.forEach((item) => {
    const span = document.createElement("span");
    span.textContent = item;
    meta.appendChild(span);
  });

  body.innerHTML = "";
  rule.body.forEach((item) => {
    if (typeof item === "string") {
      const p = document.createElement("p");
      p.textContent = item;
      body.appendChild(p);
      return;
    }

    const box = document.createElement("div");
    box.className = "score-box";
    box.textContent = item.score;
    body.appendChild(box);
  });

  tableWrap.innerHTML = "";
  const rows = scoreTables[rule.id];
  if (rows) {
    const table = document.createElement("table");
    table.className = "score-table";
    table.innerHTML = "<thead><tr><th>状态 / 描述</th><th>得分</th><th>最高分</th></tr></thead>";
    const tbody = document.createElement("tbody");
    rows.forEach((row) => {
      const tr = document.createElement("tr");
      row.forEach((cell) => {
        const td = document.createElement("td");
        td.textContent = cell;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    tableWrap.appendChild(table);
  }

  const pageNumber = String(rule.page).padStart(2, "0");
  pageImage.src = `../assets/pages/page-${pageNumber}.png`;
  pageImage.alt = `${rule.title} 对应 PDF 第 ${rule.page} 页`;
  pageCaption.textContent = `对应 PDF 原文第 ${rule.page} 页`;
  renderModal(rule, pageNumber);

  if (moveFocus) {
    card.focus({ preventScroll: true });
  }
}

function renderModal(rule, pageNumber) {
  modalTag.textContent = rule.tag;
  modalTitle.textContent = rule.title;
  modalMeta.innerHTML = meta.innerHTML;
  modalBody.innerHTML = body.innerHTML;
  modalTable.innerHTML = tableWrap.innerHTML;
  modalPageImage.src = `../assets/pages/page-${pageNumber}.png`;
  modalPageImage.alt = `${rule.title} 对应 PDF 第 ${rule.page} 页`;
  modalPageCaption.textContent = `对应 PDF 原文第 ${rule.page} 页`;
  modalPdfLink.textContent = `定位原文第 ${rule.page} 页`;
  modalPdfLink.onclick = (event) => {
    event.preventDefault();
    closeModal();
    jumpToPdfPage();
  };
}

function openModal() {
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modalSheet.focus();
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function jumpToPdfPage() {
  pdfObject.data = activePdfPageUrl;
  document.querySelector("#pdf").scrollIntoView({ behavior: "smooth", block: "start" });
}

document.querySelectorAll("[data-close-modal]").forEach((control) => {
  control.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) {
    closeModal();
  }
});

renderIndexes();
activateRule("general-info");
