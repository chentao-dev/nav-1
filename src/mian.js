// 数组数据 (本地or默认)
let hashMap = JSON.parse(localStorage.getItem("x")) || [
  { url: "//www.acfun.cn" },
  { url: "//www.bilibili.com" },
];

// 刷新页面
function render() {
  //先删除页面中, 除了新增按钮的所有li
  $("li:not(.last)").remove();
  //遍历数据新增
  hashMap.forEach((v, i) => {
    let $iocUrl = v.url.replace(/.*\/\//, "").replace(/\/.*/, ""); //删除//之前的, 删除/之后的
    let $linkUrl = $iocUrl.replace("www.", "");
    let $li = $(`
          <li>
            <a href="${v.url}">
                <div class="site">
                    <div class="logo"><img src="//${$iocUrl}/favicon.ico" alt="" onerror="this.src='images/page.png';this.onerror=null"></div>
                    <div class="link">${$linkUrl}</div>
                </div>
            </a>
            <div class='close'>
                <svg class="icon">
                    <use xlink:href="#icon-close"></use>
                </svg>
            </div>
          </li>
    `).insertBefore($("li.last"));
    //按钮,监听点击
    $li.find(".close")[0].onclick = () => {
      hashMap.splice(i, 1);
      localStorage.setItem("x", JSON.stringify(hashMap));
      //刷新
      render();
    };
  });
}
render();

// 按钮,监听点击
$(".addButton").on("click", () => {
  let url = prompt("请问你要添加的网址是什么?");
  // 如果没有//就添加//
  if (url.indexOf("//") === -1) {
    url = "//" + url;
  }
  //新增数据
  hashMap.push({ url: url });
  //存到本地存储中
  localStorage.setItem("x", JSON.stringify(hashMap));
  //刷新
  render();
});

// 页面,监听按键
$(document).on("keypress", (e) => {
  let { key } = e;
  for (let i = 0; i < hashMap.length; i++) {
    let url = hashMap[i].url.replace(/.*\/\//, "").replace("www.", "");
    if (url[0] === key) {
      open(hashMap[i].url);
    }
  }
});

// 因为事件委托, 子元素input要取消监听按键的冒泡
$("input")[0].onkeypress = (e) => {
  e.stopPropagation();
};
