(this["webpackJsonppaketo-dashboard"]=this["webpackJsonppaketo-dashboard"]||[]).push([[0],{22:function(e,t,n){e.exports=n(40)},27:function(e,t,n){},28:function(e,t,n){},29:function(e,t,n){},30:function(e,t,n){},31:function(e,t,n){},32:function(e,t,n){},39:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),s=n(17),o=n.n(s);n(27),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var i=n(1),c=n(2),u=n(6),l=n(3),h=n(4),p=(n(28),function(e){Object(h.a)(n,e);var t=Object(l.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){var e="/logo512.png";return e="".concat("/paketo-dashboard","/logo512.png"),r.a.createElement("header",null,r.a.createElement("img",{src:e,className:"logo",alt:"logo"}),r.a.createElement("h1",null,"Paketo Buildpacks"))}}]),n}(r.a.Component)),m=(n(29),function(e){Object(h.a)(n,e);var t=Object(l.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).state={token:""},a.handleChange=a.handleChange.bind(Object(u.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(u.a)(a)),a}return Object(c.a)(n,[{key:"handleChange",value:function(e){var t=e.currentTarget;this.setState({token:t.value})}},{key:"handleSubmit",value:function(e){e.preventDefault(),this.props.assignToken(this.state.token)}},{key:"render",value:function(){return r.a.createElement("form",{className:"login",onSubmit:this.handleSubmit},r.a.createElement("label",{htmlFor:"token"},"GitHub Personal Access Token"),r.a.createElement("input",{type:"text",id:"token",value:this.state.token,onChange:this.handleChange}),r.a.createElement("input",{type:"submit",value:"Submit"}))}}]),n}(r.a.Component)),d=n(8),f=(n(30),function e(t){Object(i.a)(this,e),this.key=btoa(t.name),this.name=t.name,this.url=t.url,this.openIssuesCount=t.openIssuesCount}),b=(n(31),n(32),function e(t){Object(i.a)(this,e),this.number=t.number}),v=n(5),k=n.n(v),g=n(7),O=n(21),j=function(){function e(t){Object(i.a)(this,e),this.storage=t.storage,this.assignToken=this.assignToken.bind(this),this.authenticated=this.authenticated.bind(this)}return Object(c.a)(e,[{key:"authenticated",value:function(){return!!this.storage.getItem("token")}},{key:"assignToken",value:function(e){this.storage.setItem("token",e)}},{key:"do",value:function(){var e=Object(g.a)(k.a.mark((function e(t){var n,a;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new O.a({auth:this.storage.getItem("token")}),e.next=3,n.request("".concat(t.method," ").concat(t.path));case 3:return a=e.sent,e.abrupt("return",a);case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),e}(),y=function(){function e(t){Object(i.a)(this,e),this.client=t.client}return Object(c.a)(e,[{key:"list",value:function(){var e=Object(g.a)(k.a.mark((function e(t){var n,a,r,s,o,i;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n="/repos/".concat(t,"/issues"),a=[];case 2:if(!n){e.next=11;break}return e.next=5,this.client.do({method:"GET",path:n});case 5:r=e.sent,s=Object(d.a)(r.data);try{for(s.s();!(o=s.n()).done;)(i=o.value).pull_request||a.push(new b({number:i.number}))}catch(c){s.e(c)}finally{s.f()}n=((r.headers.link||"").match(/<([^>]+)>;\s*rel="next"/)||[])[1],e.next=2;break;case 11:return e.abrupt("return",a);case 12:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),e}(),E=n(11),w=function(e){Object(h.a)(n,e);var t=Object(l.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).state={loading:!0,issues:[]},a}return Object(c.a)(n,[{key:"componentDidMount",value:function(){this.load()}},{key:"componentDidUpdate",value:function(e){this.props.repo.openIssuesCount!==e.repo.openIssuesCount&&this.load()}},{key:"load",value:function(){var e=this;this.props.store.list(this.props.repo.name).then((function(t){e.setState({loading:!1,issues:t})}))}},{key:"render",value:function(){var e="...",t="none";if(!this.state.loading){var n=this.state.issues.length;n>0&&(t="low"),n>3&&(t="medium"),n>6&&(t="high"),e="".concat(n)}return r.a.createElement("div",{className:"issue-count ".concat(t),"aria-label":"issue-count"},r.a.createElement(E.b,{size:16}),r.a.createElement("div",{className:"count"},e))}}]),n}(r.a.Component),S=(n(39),function e(t){Object(i.a)(this,e),this.number=t.number}),C=function(){function e(t){Object(i.a)(this,e),this.client=t.client}return Object(c.a)(e,[{key:"list",value:function(){var e=Object(g.a)(k.a.mark((function e(t){var n,a,r,s,o,i;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n="/repos/".concat(t,"/pulls"),a=[];case 2:if(!n){e.next=11;break}return e.next=5,this.client.do({method:"GET",path:n});case 5:r=e.sent,s=Object(d.a)(r.data);try{for(s.s();!(o=s.n()).done;)i=o.value,a.push(new S({number:i.number}))}catch(c){s.e(c)}finally{s.f()}n=((r.headers.link||"").match(/<([^>]+)>;\s*rel="next"/)||[])[1],e.next=2;break;case 11:return e.abrupt("return",a);case 12:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),e}(),x=function(e){Object(h.a)(n,e);var t=Object(l.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).state={loading:!0,pullRequests:[]},a}return Object(c.a)(n,[{key:"componentDidMount",value:function(){this.load()}},{key:"componentDidUpdate",value:function(e){this.props.repo.openIssuesCount!==e.repo.openIssuesCount&&this.load()}},{key:"load",value:function(){var e=this;this.props.store.list(this.props.repo.name).then((function(t){e.setState({loading:!1,pullRequests:t})}))}},{key:"render",value:function(){var e="...",t="none";if(!this.state.loading){var n=this.state.pullRequests.length;n>0&&(t="low"),n>3&&(t="medium"),n>6&&(t="high"),e="".concat(n)}return r.a.createElement("div",{className:"pull-request-count ".concat(t),"aria-label":"pull-request-count"},r.a.createElement(E.a,{size:16}),r.a.createElement("div",{className:"count"},e))}}]),n}(r.a.Component),N=function(e){Object(h.a)(n,e);var t=Object(l.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){var e=this.props.repo.name.split("/"),t=e[0],n=e[1];return r.a.createElement("div",{className:"repo-item"},r.a.createElement("div",{className:"org"},t),r.a.createElement("a",{className:"repo",href:this.props.repo.url,target:"_blank",rel:"noopener noreferrer"},n),r.a.createElement("div",{className:"content"},r.a.createElement(w,{store:this.props.issueStore,repo:this.props.repo}),r.a.createElement(x,{store:this.props.pullRequestStore,repo:this.props.repo})))}}]),n}(r.a.Component),T=function(){function e(t){Object(i.a)(this,e),this.client=t.client}return Object(c.a)(e,[{key:"list",value:function(){var e=Object(g.a)(k.a.mark((function e(t){var n,a,r,s,o,i;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=[],a="/orgs/".concat(t,"/repos");case 2:if(!a){e.next=11;break}return e.next=5,this.client.do({method:"GET",path:a});case 5:r=e.sent,s=Object(d.a)(r.data);try{for(s.s();!(o=s.n()).done;)i=o.value,n.push(new f({name:i.full_name,url:i.html_url,openIssuesCount:i.open_issues_count}))}catch(c){s.e(c)}finally{s.f()}a=((r.headers.link||"").match(/<([^>]+)>;\s*rel="next"/)||[])[1],e.next=2;break;case 11:return e.abrupt("return",n);case 12:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),e}(),q=function(e){Object(h.a)(n,e);var t=Object(l.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).state={loading:!0,repos:[]},a.handleReload=a.handleReload.bind(Object(u.a)(a)),a}return Object(c.a)(n,[{key:"componentDidMount",value:function(){this.load()}},{key:"load",value:function(){var e=this;Promise.all([this.props.store.list("paketo-buildpacks"),this.props.store.list("paketo-community")]).then((function(t){var n,a=[],r=Object(d.a)(t);try{for(r.s();!(n=r.n()).done;){var s,o=n.value,i=Object(d.a)(o);try{for(i.s();!(s=i.n()).done;){var c=s.value;a.push(c)}}catch(u){i.e(u)}finally{i.f()}}}catch(u){r.e(u)}finally{r.f()}a.sort((function(e,t){var n=e.name.toUpperCase(),a=t.name.toUpperCase();return n<a?-1:n>a?1:0})),e.setState({loading:!1,repos:a})}))}},{key:"handleReload",value:function(e){this.load()}},{key:"render",value:function(){var e=this,t=r.a.createElement("div",{className:"loading"},"...");return this.state.loading||(t=this.state.repos.map((function(t){return r.a.createElement(N,{key:t.key,repo:t,issueStore:e.props.issueStore,pullRequestStore:e.props.pullRequestStore})}))),r.a.createElement("div",{className:"repo-list"},r.a.createElement("div",{className:"title"},r.a.createElement("h2",null,"Overview"),r.a.createElement("button",{onClick:this.handleReload},r.a.createElement(E.c,{size:16}))),r.a.createElement("div",{className:"list"},t))}}]),n}(r.a.Component),R=function(e){Object(h.a)(n,e);var t=Object(l.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).state={authenticated:a.props.gitHubClient.authenticated()},a.assignToken=a.assignToken.bind(Object(u.a)(a)),a}return Object(c.a)(n,[{key:"assignToken",value:function(e){this.props.gitHubClient.assignToken(e),this.setState({authenticated:this.props.gitHubClient.authenticated()})}},{key:"render",value:function(){var e=r.a.createElement(m,{assignToken:this.assignToken});return this.state.authenticated&&(e=r.a.createElement(q,{store:this.props.repoStore,issueStore:this.props.issueStore,pullRequestStore:this.props.pullRequestStore})),r.a.createElement("div",{className:"app"},r.a.createElement(p,null),r.a.createElement("section",{className:"body"},e))}}]),n}(r.a.Component),I=new j({storage:window.localStorage}),D=new T({client:I}),_=new y({client:I}),H=new C({client:I});o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(R,{gitHubClient:I,repoStore:D,issueStore:_,pullRequestStore:H})),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[22,1,2]]]);
//# sourceMappingURL=main.5797610d.chunk.js.map