# 个人简历

[TOC]

##基本信息 
@[基本信息]    
  ![我的照片](https://cpp1992.github.io/me.png)
**姓    名**：程鹏鹏             
**性    别**：男                                        
**出生年月**：1992.10
**籍    贯**：江苏泰州
**学    位**：硕士				            
**工作经验**：一年实习
**联系电话**：18621814113           
**电子邮箱**：1018423717@qq.com 
**硕士院校**：中国科学技术大学      **专业排名**：软件工程 前20%
**本科院校**：南京师范大学			**专业排名**：计算机科学 前30%

-------------------
##求职意向 
@[求职意向]  前端工程师     毕业时间2018.3 

-------------------
##技能素质 
@[技能素质]  **熟悉**：HTML(5)、CSS(3)、原生js、jQuery、React、Git
**掌握**：Bootstrap、HignCharts、Datatable
**了解**：NodeJS、Vue、PHP、Python、D3、Angular2
**Github地址**：https://github.com/cpp1992

-------------------
##项目、工作经历
@[项目、工作经历] 项目名称：eBay同构服务器管理系统
项目时间：2016/10-至今
负责部分：负责系统的前端部分。
项目简介：eBay同构服务器管理系统（Big Data Portal Web System,以下简称BDP系统）
是由eBay上海研究中心研发的服务器运行管理Web软件，以高性能、低维护成本帮助
企业DBA管理者高效率地管理服务器。BDP系统通过友好的页面使用户可以方便直观
地进行Hadoop集群服务器管理、Hadoop集群任务管理、Hadoop集群数据监控。
前端：基础是React，架构是Redux，图表采用Bootstrap、Datatable、HighCharts、
D3，组件库采用：BDP-Componets
后端：基础是NodeJS，架构是Express
语言以及规范：基础语言是ES6、JSX，编译风格Eslint-Airbnb，包管理以及发布采用
Webpack2和npm
在这个项目中，我们采用了Isomorphic同构技术，用以加快首屏渲染的速度，用户友好
度很高，另外，数据分离的初步实践，让我知道了项目管理问题追溯可以如此轻松。目
前项目已经运行了半年，日PV在400左右。

项目名称：React组件展示系统
项目时间：2016/06-至今
项目描述：每个公司都有自己熟悉的框架，React的组件库也多种多样，考虑到以后可
能同样会接触到各种不同的公司组件库，那么如何让自己快速熟悉这么多复杂的组件库
呢？我决定自己从零做起，写一个自己的React组件库，我给它取名Fairy。组件库采
用了AdminLTE的基础样式，顶层封装了属性类和常用方法，组件涵盖：<A> <Form>
<TypeAhead> <Tree> <Dialog> <AreaChart> 等等。
当前版本：1.9.0，我已经于近期将该组件开源至社区，希望可以和社区一起进步。
Github地址：https://cpp1992.github.io/

项目名称：银联PHP 版本无跳转支付全渠道SDK
项目时间：2016/06-2016.09
项目描述： 银联无跳转支付产品，是银联为满足有资质的大型在线商店对方便快捷的
网上支付的诉求，专门设计的一种全新的互联网支付模式。
个人职责：主要负责普通该版本全渠道无跳转支付接口的加密、验签、解密，demo 测
试编写以及绝大部分代码实现，目前代码以及上线，详见：
https://open.unionpay.com/ajweb/help/file/techFile?productId=2

-------------------
##证书荣誉
@[证书荣誉] 学校荣誉：南京师范大学“苏宁易购杯”编程大赛 一等奖   英语六级：468分

-------------------
##自我评价
@[自我评价] 热爱前端、为人随和、学习能力强、合作意识强、富有吃苦耐劳的精神、学习勤快喜欢钻研。

-------------------
##一段有趣的代码
@[一段有趣的代码]
``` js
function loopRender($htmlApp, timeToLoad) {
	return new Promise((resolve) => {
		let componentHTML = renderToString($htmlApp);
		if ($htmlApp) {
				const renderHTML = renderToString($htmlApp);
				if(componentHTML === renderHTML){
					resolve(renderToString(renderHTML));
				}
				return;
		} else if (timeToLoad) {
			resolve(componentHTML);
		}
	});
}
```
祝安好。
