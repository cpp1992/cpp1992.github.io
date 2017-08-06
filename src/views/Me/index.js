import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';
import $ from 'jquery';
import { TabContent, Tabs } from '../../../components';

import styles from './index.scss';

class Me extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	componentDidMount() {
		$(window).resize();
	}

	render() {
		const $newUser = (
				<div className="alert alert-success alert-dismissible">
					<button className="close" onClick={this.onHideInfo}>
						<span className="fa fa-times" />
					</button>
					<h4>
						<span className="icon fa fa-check" /> Congratulations!
					</h4>
					Your application has already been submitted!
					You will be notified with review result through email later.
				</div>
			);

		return (
			<div>
				<section className="content-header">
					<h1>
						我的简历
						<small>有梦想就去追，别觉得累。</small>
					</h1>
				</section>
				<section className="content">
					<div styleName="guide">
						<Tabs header={$newUser} isBox>
							<TabContent name="我的简历">
								<p>
									曾经有个美丽的菇凉~问我她美不美，我答：美~诶不美~，遂注孤生 ❥(^_-)
								</p>

								<h1>基本信息</h1>


								<table className="table table-bordered">
									<thead>
										<tr>
											<td width="50%">
												<p>热爱前端</p>
												<p>为人随和</p>
												<p>学习能力强</p>
												<p>合作意识强</p>
												<p>富有吃苦耐劳的精神</p>
												<p>学习勤快喜欢钻研</p>
												<p>是的！就是我！</p>
												<p>是的！就是左边这个小帅哥！发起进攻(　 ´-ω ･)▄︻┻┳══━一</p>
											</td>
											<td>
												<img src="https://cpp1992.github.io/me.png" alt="我的照片" />
											</td>
										</tr>
									</thead>
									<tbody>
									<tr>
										<td>姓    名：程鹏鹏</td>
										<td>性    别：男</td>
									</tr>
									<tr>
										<td>出生年月：1992.10</td>
										<td>籍    贯：泰州</td>
									</tr>
									<tr>
										<td>工作经验：在读</td>
										<td>学位：硕士</td>
									</tr>
									<tr>
										<td>电子邮箱：1018423717@qq.com</td>
										<td>联系电话：18621814113 </td>
									</tr>
									<tr>
										<td>硕士院校：中国科学技术大学 </td>
										<td>专业排名：软件工程 前20%</td>
									</tr>
									<tr>
										<td>本科院校：南京师范大学	</td>
										<td>专业排名：计算机科学 前30%</td>
									</tr>
									</tbody>
								</table>

								<h1>求职意向</h1>
								<pre>前端工程师 毕业时间2018.3</pre>

								<h1>技能素质</h1>
								<pre styleName="prebook">{`熟悉：HTML(5)、CSS(3)、原生js、jQuery、React、Git
掌握：Bootstrap、HignCharts、Datatable
了解：NodeJS、Vue、PHP、Python、D3、Angular2
Github地址：https://github.com/cpp1992`}</pre>

								<h1>证书荣誉</h1>
								<pre styleName="prebook">{`学校荣誉：南京师范大学“苏宁易购杯”编程大赛 一等奖
南师大：校优秀毕业生、三好学生
中科大：三好学生
英语六级：468分
学生干部：2011-2014  文体委员  2015-2016  文体委员`}</pre>

								<h1>项目、工作经历</h1>
								<pre styleName="prebook">{`项目名称：eBay同构服务器管理系统
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
用了AdminLTE的基础样式，顶层封装了属性类和常用方法，组件涵盖：A Form
TypeAhead Tree Dialog AreaChart 等等。
当前版本：1.9.0，我已经于近期将该组件开源至社区，希望可以和社区一起进步。
Github地址：https://cpp1992.github.io/

项目名称：银联PHP 版本无跳转支付全渠道SDK
项目时间：2016/06-2016.09
项目描述： 银联无跳转支付产品，是银联为满足有资质的大型在线商店对方便快捷的
网上支付的诉求，专门设计的一种全新的互联网支付模式。
个人职责：主要负责普通该版本全渠道无跳转支付接口的加密、验签、解密，demo 测
试编写以及绝大部分代码实现，目前代码以及上线，详见：
https://open.unionpay.com/ajweb/help/file/techFile?productId=2

实习企业：腾讯
项目名称：Nikki奇迹暖暖手游日服活动项目
项目时间：2015/07-2016.10
项目描述：腾讯上海游戏分部，奇迹暖暖游戏洽接部门。
主要做一些UI交互，切图，用的是jQuery等技术做奇迹暖暖日本的主页。`}</pre>

								<h1>一段有趣的代码</h1>
								<pre styleName="prebook">
							{`function loopRender($htmlApp, timeToLoad) {
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
}`}
						</pre>
								<hr />
							</TabContent>
							<TabContent name="有个故事">
								<pre styleName="prebook">
									{`从前，有两家互不知晓的公司，一家叫做“自动会计应用协会”，另外一家叫做“统一计算资本公司”。他们同时决定开发一种提供相同功能的程序。

“自动”雇佣了一位分析程序员，艾伦，来解决这个问题。

而“统一”决定试一下新来的初级程序员查尔斯，看看他是否有真本事。

艾伦做过一些复杂项目，有着丰富的经验，决定采用PQR结构化方法来开发这个程序。于是他找到部门经理，要求增派3名程序员组成一个项目小组。

这个小组于是开始工作，捣鼓出初步的项目分析报告。

“统一”这边，查尔斯抽了点时间想了一下需要解决的问题。同事们常常看到查尔斯把脚翘在办公桌上喝咖啡。

偶尔见到他坐在电脑前，但是那有节奏的键盘声告诉别人他其实在玩小蜜蜂。

不久，“自动”的小组开始编写代码了。程序员们一半的时间用来编写编译代码，另一半的时间待在会议室里，讨论模块间的接口设计。

查尔斯的同事发现他终于不再玩小蜜蜂，而是一半的时间把脚翘到办公桌上喝咖啡，另一半时间在纸片上涂写着什么。

他好像不是在纸上玩“井字过三关”，但看起来不像是在写有用的东西。

两个月过去了。“自动”的小组终于发布了项目时间表。计划再过两个月，他们就会发布程序的测试版本。

然后再经过两个月的测试和改进，就可以发布完成版了。

此刻，对于查尔斯的游手好闲，他的经理再也看不下去了，他决定批评查尔斯一下。

但当经理走进查尔斯的办公室时，他却惊讶地发现查尔斯在电脑前正埋头写代码。

于是他决定把批评先放一放，随便跟查尔斯聊了一下就离开了。然而从此他更加注意观察查尔斯的表现，想借机批评查尔斯。

不过不愉快的对话并没有发生，他很高兴地发现查尔斯一直在写代码。

人们偶尔发现查尔斯推迟了午餐，且一周还主动加2、3次班。

第三个月的月底，查尔斯宣布他已经完成了这个项目。他提交了500行的程序。

程序清晰可读，测试中符合所有的功能要求，甚至具备了一些更加便利的功能，极大地提高了程序的易用性。

测试后，程序除了有一处疏忽外，表现得非常好。

“自动”的项目小组到此时已经将4个主要模块中的2个开发出来了。在这些模块被测试的同时，小组继续开发其余的模块。

又过了3周，艾伦宣布提前一周完成了程序的初级版。他提交了一份清单，列举了尚需解决的一些缺陷。

测试中，客户发现了一些清单上没有的错误和缺陷。

艾伦解释说这是意料之中的，毕竟这只是一个初级的版本，有错误很正常。

又过了两个月，项目小组完成了程序的正式版，包含了2500行代码。测试中发现，这个版本完成绝大部分的最初需求。

程序功能上有一两处遗漏，且对于数据输入的格式要求非常严格。

但公司最终决定使用这个程序，他们可以训练打字员严格按照要求输入数据。对于那些遗漏的功能，交由维护程序员去添加。

后记：

一开始经理对查尔斯的能力印象深刻。可当他阅读源代码的时候，发现原来问题比自己开始想象的要简单得多。

现在看来，这种难度哪怕对于初级程序员来说也明显太低了。

的确，查尔斯平均每天产出了5行代码，这略高于平均水平。但是考虑到项目复杂度是如此的低，略高的生产率也不足为奇。

而且经理对他头两个月的游手好闲记忆犹新。

业绩评估中，查尔斯薪水的涨幅大概是同期货币通货膨胀率的一半，他也没被提升。又过了一年，他感到沮丧而离开了“统一”。

“自动”这边，艾伦因为按时完成这个项目而受到表扬。他的主管翻了几页源代码，发现代码符合公司的结构化编程规范。

但他很快便放弃了阅读代码的想法，因为它看起来相当深奥。

他现在意识到项目的复杂度远比当初自己设想的高，于是他再一次夸赞艾伦的成就。

项目小组平均每人每天写3行代码，刚好是平均水平。但考虑到问题的复杂度，有平均水平就非常不错了。

艾伦被大幅加薪，作为奖励，他被提升为系统分析员。`
									}
								</pre>
							</TabContent>
						</Tabs>
					</div>
				</section>
			</div>
		);
	}
}

Me.propTypes = {
	dispatch: PropTypes.func,
};

const mapState = ({
	mdfiles,
}) => ({
	mdfilesList: mdfiles,
});

export default connect(mapState)(cssModules(Me, styles));
