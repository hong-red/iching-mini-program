// utils/guaData.js
const trigrams = [
  { name: "乾", symbol: "☰", binary: "111", meaning: "天", core: "自强不息", kidExplain: "像大老虎一样勇敢向前冲！" },
  { name: "兑", symbol: "☱", binary: "001", meaning: "泽", core: "喜悦", kidExplain: "像开心果一样给大家快乐！" },
  { name: "离", symbol: "☲", binary: "101", meaning: "火", core: "光明", kidExplain: "像小太阳，温暖又闪亮！" },
  { name: "震", symbol: "☳", binary: "100", meaning: "雷", core: "行动", kidExplain: "像打雷一样突然有惊喜！" },
  { name: "巽", symbol: "☴", binary: "011", meaning: "风", core: "顺从", kidExplain: "像风一样轻轻地悄悄靠近～" },
  { name: "坎", symbol: "☵", binary: "010", meaning: "水", core: "险难", kidExplain: "像小溪流，要勇敢过难关！" },
  { name: "艮", symbol: "☶", binary: "110", meaning: "山", core: "停止", kidExplain: "像大山一样稳稳站住脚！" },
  { name: "坤", symbol: "☷", binary: "000", meaning: "地", core: "柔顺", kidExplain: "像大地妈妈一样包容一切哦～" },
];

const hexagramNames = {
  "111111": { name: "乾为天", meaning: "刚健中正，自强不息", core: "创造，领导", kidExplain: "像天空一样广阔，充满力量，要勇敢做自己！" },
  "111001": { name: "天泽履", meaning: "履行，践行", core: "践行，礼仪", kidExplain: "像天空和湖水一样，我们要遵守规则，好好走路，有礼貌。" },
  "111101": { name: "天火同人", meaning: "同心同德，志同道合", core: "同心，合作", kidExplain: "像天空和火光一样，大家心往一处想，劲往一处使，一起做好事！" },
  "111000": { name: "天地否", meaning: "闭塞不通，不顺", core: "阻碍，不通", kidExplain: "像天空和大地分开了，暂时有点不开心，但会好起来的！" },
  "111011": { name: "天风姤", meaning: "相遇，邂逅", core: "相遇，交流", kidExplain: "像风儿吹过天空，会遇到很多新朋友！" },
  "111010": { name: "天水讼", meaning: "争讼，争执", core: "争执，诉讼", kidExplain: "像天空和水互相不服气，遇到问题要好好讲道理，不要吵架。" },
  "111110": { name: "天山遁", meaning: "退避，隐居", core: "退守，等待", kidExplain: "像大山一样安静，遇到困难时可以先休息一下。" },
  "111100": { name: "天雷无妄", meaning: "无妄之灾，不期而遇", core: "真诚，无妄", kidExplain: "像天空突然打雷，有时候会遇到意想不到的事情，要保持真诚。" },

  "001111": { name: "泽天夬", meaning: "决断，决裂", core: "决断，果敢", kidExplain: "像湖水和天空一样，遇到问题要勇敢地做出决定！" },
  "001001": { name: "兑为泽", meaning: "喜悦，和乐", core: "喜悦，交流", kidExplain: "像湖水一样清澈，大家在一起开开心心，分享快乐！" },
  "001101": { name: "泽火革", meaning: "变革，改革", core: "变革，创新", kidExplain: "像湖水和火光一样，我们要勇敢地改变不好的东西，让世界变得更好。" },
  "001000": { name: "泽地萃", meaning: "聚集，荟萃", core: "聚集，团结", kidExplain: "像小水滴汇聚成湖泊，大家团结起来力量大！" },
  "001011": { name: "泽风大过", meaning: "大有过失，过分", core: "过分，超越", kidExplain: "像湖水和风儿太大了，有时候会做错事，要及时改正哦！" },
  "001010": { name: "泽水困", meaning: "困顿，艰难", core: "困境，受阻", kidExplain: "像湖水被困住了，遇到难题不要怕，想想办法就能解决！" },
  "001110": { name: "泽山咸", meaning: "感应，交感", core: "感应，影响", kidExplain: "像山和湖水互相影响，我们要用心感受别人的想法。" },
  "001100": { name: "泽雷随", meaning: "随从，追随", core: "跟随，顺应", kidExplain: "像湖水跟着雷声走，我们要学会听从好的建议，跟着大家一起进步。" },

  "101111": { name: "火天大有", meaning: "大获丰收，富有", core: "拥有，丰盛", kidExplain: "像太阳照耀着天空，一切都变得很美好，收获满满！" },
  "101001": { name: "火泽睽", meaning: "睽违，乖离", core: "睽违，分离", kidExplain: "像火光和湖水互相不看对方，大家要好好沟通，不要闹别扭。" },
  "101101": { name: "离为火", meaning: "光明，附丽", core: "光明，依附", kidExplain: "像火苗一样明亮，照亮自己也照亮别人！" },
  "101000": { name: "火地晋", meaning: "前进，上升", core: "前进，发展", kidExplain: "像太阳从地平线升起，充满希望，要努力向前冲！" },
  "101011": { name: "火风鼎", meaning: "鼎盛，革新", core: "革新，稳定", kidExplain: "像大锅一样稳稳当当，把旧的东西变成新的，变得更好！" },
  "101010": { name: "火水未济", meaning: "未完成，未成功", core: "未济，未成", kidExplain: "像火和水没有融合，事情还没做好，需要再努力！" },
  "101110": { name: "火山旅", meaning: "旅行，漂泊", core: "旅行，在外", kidExplain: "像火光照亮山路，勇敢地去外面看看世界！" },
  "101100": { name: "火雷噬嗑", meaning: "咬合，惩罚", core: "惩罚，解决", kidExplain: "像火光和雷声一起，遇到坏人要勇敢地制止他们！" },

  "100111": { name: "雷天大壮", meaning: "壮盛，强盛", core: "强盛，壮大", kidExplain: "像雷声和天空一样强大，我们要努力学习，变得更厉害！" },
  "100001": { name: "雷泽归妹", meaning: "少女出嫁，不合时宜", core: "嫁娶，不当", kidExplain: "像小妹妹出嫁，虽然有点急，但也要好好准备哦！" },
  "100101": { name: "雷火丰", meaning: "丰盛，富足", core: "丰盛，富有", kidExplain: "像雷声和火光一样，收获满满，生活变得很富裕！" },
  "100000": { name: "雷地豫", meaning: "欢愉，安乐", core: "安乐，准备", kidExplain: "像雷声过后大地平静，开开心心，但也要为未来做准备哦！" },
  "100011": { name: "雷风恒", meaning: "恒久，长久", core: "持久，不变", kidExplain: "像雷声和风儿一直都在，做事情要有耐心，坚持下去！" },
  "100010": { name: "雷水解", meaning: "解除，缓解", core: "解除，化解", kidExplain: "像雷雨过后水流顺畅，把烦恼都冲走，心情变好啦！" },
  "100110": { name: "雷山小过", meaning: "小有过失，略微超过", core: "小错，谨慎", kidExplain: "像小小的雷声，提醒我们做事要小心，不要犯小错误。" },
  "100100": { name: "震为雷", meaning: "震动，奋起", core: "行动，震动", kidExplain: "像打雷一样，充满活力，要勇敢地去尝试新事物！" },

  "011111": { name: "风天小畜", meaning: "小有畜养，积蓄", core: "积蓄，等待", kidExplain: "像风儿把小云朵聚集起来，一点点积累，等待大收获！" },
  "011001": { name: "风泽中孚", meaning: "诚信，孚信", core: "诚信，信任", kidExplain: "像风儿和湖水一样，我们要真诚待人，让大家相信我们。" },
  "011101": { name: "风火家人", meaning: "家庭，家人", core: "家庭，和睦", kidExplain: "像风儿和火光一样，一家人要和和睦睦，互相照顾。" },
  "011000": { name: "风地观", meaning: "观察，瞻仰", core: "观察，审视", kidExplain: "像风儿轻轻吹过大地，要仔细看看周围的世界。" },
  "011011": { name: "巽为风", meaning: "柔顺，渗透", core: "顺从，深入", kidExplain: "像风儿一样温柔，悄悄地帮助别人，让事情变得更好！" },
  "011010": { name: "风水涣", meaning: "涣散，离散", core: "离散，化解", kidExplain: "像风吹散水面，把不好的事情都吹走，让大家重新团结起来。" },
  "011110": { name: "风山渐", meaning: "渐进，发展", core: "渐进，发展", kidExplain: "像风儿吹过大山，一点点地进步，慢慢地变得更好！" },
  "011100": { name: "风雷益", meaning: "增益，受益", core: "增益，帮助", kidExplain: "像风儿和雷声互相帮助，我们会得到很多帮助，变得更棒！" },

  "010111": { name: "水天需", meaning: "等待，需求", core: "等待，需求", kidExplain: "像水流等待天空下雨，我们要有耐心，等待好时机。" },
  "010001": { name: "水泽节", meaning: "节制，节约", core: "节制，适度", kidExplain: "像水流被拦住了，我们要学会控制自己，不要浪费。" },
  "010101": { name: "水火既济", meaning: "已完成，已成功", core: "成功，完成", kidExplain: "像水和火完美融合，事情都做好了，可以开心地庆祝啦！" },
  "010000": { name: "水地比", meaning: "亲近，亲比", core: "亲近，团结", kidExplain: "像水流和大地一样亲近，大家要互相帮助，团结友爱！" },
  "010011": { name: "水风井", meaning: "井水，养育", core: "滋养，不变", kidExplain: "像井水一样，虽然看起来普通，但能给大家带来帮助。" },
  "010010": { name: "坎为水", meaning: "险陷，重重困难", core: "险难，智慧", kidExplain: "像水流遇到很多障碍，但只要动脑筋，就能找到出路！" },
  "010110": { name: "水山蹇", meaning: "艰难，跛足", core: "艰难，阻碍", kidExplain: "像水流遇到大山，前进有点难，但坚持就能过去！" },
  "010100": { name: "水雷屯", meaning: "初生，艰难", core: "初创，艰难", kidExplain: "像水和雷刚开始，事情有点难，但只要努力就能成功！" },

  "110111": { name: "山天大畜", meaning: "大有畜养，积蓄", core: "积蓄，培养", kidExplain: "像大山一样，积累很多知识和力量，为未来做准备！" },
  "110001": { name: "山泽损", meaning: "减损，损失", core: "减损，付出", kidExplain: "像大山和湖水一样，有时候会失去一些东西，但也会有新的收获。" },
  "110101": { name: "山火贲", meaning: "装饰，文饰", core: "装饰，美化", kidExplain: "像大山上的火光一样，把东西打扮得漂漂亮亮！" },
  "110000": { name: "山地剥", meaning: "剥落，衰败", core: "剥蚀，消退", kidExplain: "像山上的叶子慢慢掉落，有些东西会变少，但新的会再长出来。" },
  "110011": { name: "山风蛊", meaning: "蛊惑，弊端", core: "弊端，整顿", kidExplain: "像山里有风，有些不好的东西要及时清理掉，让一切变好。" },
  "110010": { name: "山水蒙", meaning: "蒙昧，启蒙", core: "蒙昧，启迪", kidExplain: "像山里有水，一开始有点迷糊，但会慢慢变聪明！" },
  "110110": { name: "艮为山", meaning: "停止，安止", core: "停止，稳定", kidExplain: "像大山一样稳稳当当，遇到事情要冷静，不要着急！" },
  "110100": { name: "山雷颐", meaning: "颐养，自养", core: "颐养，修身", kidExplain: "像大山和雷声一样，我们要好好吃饭，好好休息，照顾好自己。" },

  "000111": { name: "地天泰", meaning: "通泰，平安", core: "通泰，和谐", kidExplain: "像大地和天空一样和谐，一切都顺顺利利，开开心心！" },
  "000001": { name: "地泽临", meaning: "临近，亲临", core: "临近，监督", kidExplain: "像大地和湖水一样，我们要关心身边的人，互相帮助。" },
  "000101": { name: "地火明夷", meaning: "光明受损，晦暗", core: "晦暗，隐忍", kidExplain: "像大地上的火光被遮住了，遇到不开心的事情要忍耐，等待光明。" },
  "000000": { name: "坤为地", meaning: "柔顺，包容", core: "承载，包容", kidExplain: "像大地妈妈一样，温柔地包容一切，让万物生长！" },
  "000011": { name: "地风升", meaning: "上升，晋升", core: "上升，进步", kidExplain: "像大地上的风儿向上吹，我们会一点点进步，变得更厉害！" },
  "000010": { name: "地水师", meaning: "军队，师出有名", core: "军队，纪律", kidExplain: "像大地上的水流一样，大家团结起来，有纪律地完成任务！" },
  "000110": { name: "地山谦", meaning: "谦虚，退让", core: "谦逊，虚心", kidExplain: "像大地一样低调，虽然很厉害，但从不骄傲。" },
  "000100": { name: "地雷复", meaning: "复归，回复", core: "回复，新生", kidExplain: "像大地上的雷声，不好的事情过去了，新的希望又来了！" },
};


const guaList = [];
for (let i = 0; i < trigrams.length; i++) {
  for (let j = 0; j < trigrams.length; j++) {
    const upperTrigram = trigrams[i];
    const lowerTrigram = trigrams[j];

    const hexagramBinary = upperTrigram.binary + lowerTrigram.binary;
    const hexagramSymbol = upperTrigram.symbol + '\n' + lowerTrigram.symbol;

    const hexagramInfo = hexagramNames[hexagramBinary];

    if (hexagramInfo) {
      guaList.push({
        name: hexagramInfo.name,
        symbol: hexagramSymbol,
        binary: hexagramBinary,
        meaning: hexagramInfo.meaning,
        core: hexagramInfo.core,
        kidExplain: hexagramInfo.kidExplain,
      });
    } else {
      // Fallback for any missing hexagrams (should not happen if hexagramNames is complete)
      guaList.push({
        name: `${upperTrigram.name}${lowerTrigram.name}`,
        symbol: hexagramSymbol,
        binary: hexagramBinary,
        meaning: `由${upperTrigram.meaning}和${lowerTrigram.meaning}组成`,
        core: `${upperTrigram.core}与${lowerTrigram.core}的结合`,
        kidExplain: `这是一个关于${upperTrigram.kidExplain.replace('像', '').replace('一样', '')}和${lowerTrigram.kidExplain.replace('像', '').replace('一样', '')}的故事。`,
      });
    }
  }
}

const getGuaByBinary = (binary) => {
  return guaList.find(g => g.binary === binary) || { name: "未知", kidExplain: "哇，这个卦好神秘～" };
};

module.exports = { guaList, getGuaByBinary };
