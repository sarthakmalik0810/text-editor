(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{eyox:function(n,t,e){"use strict";e.r(t),e.d(t,"LandingModule",function(){return f});var o=e("ofXK"),i=e("tyNb"),r=e("mrSG"),c=e("fXoL"),a=e("y5O5"),s=e("dNgK");function l(n,t){if(1&n){const n=c.Ob();c.Nb(0,"li"),c.Nb(1,"a",8),c.Vb("click",function(){return c.ic(n),c.Xb().logout()}),c.rc(2,"Logout"),c.Mb(),c.Mb()}}function g(n,t){1&n&&(c.Nb(0,"li"),c.Nb(1,"a",30),c.rc(2,"Login/SignUp"),c.Mb(),c.Mb())}const d=[{path:"",component:(()=>{class n{constructor(n,t,e){this.userService=n,this.snackbar=t,this.router=e,this.sarthakURL="https://www.linkedin.com/in/sarthak-malik-b91725199/",this.mayankURL="https://www.linkedin.com/in/mayank-sethi-88879116b/",this.sarthakGit="https://github.com/sarthakmalik0810",this.mayankGit="https://github.com/mayanksethi97"}ngOnInit(){}openInNewWindow(n){window.open(n,"_blank").focus()}scrollToElement(n){n.scrollIntoView({behavior:"smooth",block:"start",inline:"nearest"})}logout(){return Object(r.a)(this,void 0,void 0,function*(){(yield this.userService.signOut()).bool&&this.openSnackBar("Logged Out")})}loginRoute(){this.router.navigate(["/login"])}openSnackBar(n){this.snackbar.open(n,"X",{duration:2e3})}}return n.\u0275fac=function(t){return new(t||n)(c.Kb(a.a),c.Kb(s.a),c.Kb(i.b))},n.\u0275cmp=c.Eb({type:n,selectors:[["app-landing"]],decls:61,vars:4,consts:[["name","viewport","content","width=device-width, initial-scale=1"],["rel","icon","type","image/x-icon","href",c.uc("favicon.ico")],["rel","preconnect","href",c.uc("https://fonts.gstatic.com")],["href",c.uc("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap"),"rel","stylesheet"],["href",c.uc("https://fonts.googleapis.com/icon?family=Material+Icons"),"rel","stylesheet"],[1,"top-bar"],[1,"logo"],[1,"nav-links"],[3,"click"],[4,"ngIf","ngIfElse"],["loginButton",""],[1,"intro"],[1,"intro-row"],["src","assets/images/text-field-landing.svg","alt",""],[1,"intro-row","second"],["src","assets/images/access-anywhere-landing.svg","alt",""],["routerLink","/editor",1,"app"],[1,"contact"],["contact",""],[1,"contact-div"],[1,"hire"],[1,"linkedin"],[1,"avatar",2,"background-image","url(assets/images/mayank-profile.jpeg)"],[1,"l-name"],[1,"l-tag"],[1,"buttons"],[1,"linkedin-btn",3,"click"],["src","assets/images/LinkedIn-Logo.wine.svg","alt",""],["src","assets/images/GitHub_Logo.png","alt",""],[1,"avatar",2,"background-image","url(assets/images/sarthak-profile.jpg)"],["routerLink","/login"]],template:function(n,t){if(1&n){const n=c.Ob();c.Lb(0,"meta",0),c.Lb(1,"link",1),c.Lb(2,"link",2),c.Lb(3,"link",3),c.Lb(4,"link",4),c.Nb(5,"section",5),c.Nb(6,"p",6),c.rc(7,"texty"),c.Mb(),c.Nb(8,"nav",7),c.Nb(9,"ul"),c.Nb(10,"li",8),c.Vb("click",function(){c.ic(n);const e=c.gc(35);return t.scrollToElement(e)}),c.rc(11,"Contact Us"),c.Mb(),c.pc(12,l,3,0,"li",9),c.Yb(13,"async"),c.pc(14,g,3,0,"ng-template",null,10,c.qc),c.Mb(),c.Mb(),c.Mb(),c.Nb(16,"section",11),c.Nb(17,"div",12),c.Nb(18,"div"),c.Nb(19,"h2"),c.rc(20,"Texty - The WYSIWYG Editor"),c.Mb(),c.Nb(21,"p"),c.rc(22," Rich Text Editor built using Angular, enables you to create documents over the web. "),c.Mb(),c.Mb(),c.Lb(23,"img",13),c.Mb(),c.Nb(24,"div",14),c.Lb(25,"img",15),c.Nb(26,"div"),c.Nb(27,"h2"),c.rc(28,"Access from anywhere, anytime."),c.Mb(),c.Nb(29,"p"),c.rc(30," Login and enable yourself to save and edit your docs on the go from multiple devices. "),c.Mb(),c.Lb(31,"br"),c.Nb(32,"button",16),c.rc(33,"Go To Editor"),c.Mb(),c.Mb(),c.Mb(),c.Mb(),c.Nb(34,"section",17,18),c.Nb(36,"div",19),c.Nb(37,"div",20),c.rc(38,"WE ARE OPEN TO WORK!"),c.Mb(),c.Nb(39,"div",21),c.Lb(40,"div",22),c.Nb(41,"div",23),c.rc(42,"Mayank Sethi"),c.Mb(),c.Nb(43,"div",24),c.rc(44,"Web Developer at Infosys"),c.Mb(),c.Nb(45,"div",25),c.Nb(46,"div",26),c.Vb("click",function(){return t.openInNewWindow(t.mayankURL)}),c.Lb(47,"img",27),c.Mb(),c.Nb(48,"div",26),c.Vb("click",function(){return t.openInNewWindow(t.mayankGit)}),c.Lb(49,"img",28),c.Mb(),c.Mb(),c.Mb(),c.Nb(50,"div",21),c.Lb(51,"div",29),c.Nb(52,"div",23),c.rc(53,"Sarthak Malik"),c.Mb(),c.Nb(54,"div",24),c.rc(55,"Web Developer @ Infosys | JS | Angular"),c.Mb(),c.Nb(56,"div",25),c.Nb(57,"div",26),c.Vb("click",function(){return t.openInNewWindow(t.sarthakURL)}),c.Lb(58,"img",27),c.Mb(),c.Nb(59,"div",26),c.Vb("click",function(){return t.openInNewWindow(t.sarthakGit)}),c.Lb(60,"img",28),c.Mb(),c.Mb(),c.Mb(),c.Mb(),c.Mb()}if(2&n){const n=c.gc(15);c.Ab(12),c.cc("ngIf",c.Zb(13,2,t.userService.user$))("ngIfElse",n)}},directives:[o.k,i.c,i.d],pipes:[o.b],styles:['@import url("https://fonts.googleapis.com/css2?family=Oswald&display=swap");@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap");*[_ngcontent-%COMP%]{box-sizing:border-box;margin:0;padding:0;overflow:hidden}a[_ngcontent-%COMP%]{text-decoration:none!important;color:#fff}a[_ngcontent-%COMP%]:hover{color:#f0f8ff}.top-bar[_ngcontent-%COMP%]{width:100%;height:8vh;background-color:#212121;display:flex;justify-content:space-between;align-items:center;padding:0 1rem;position:fixed;z-index:100}ul[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]:hover{cursor:pointer}.logo[_ngcontent-%COMP%]{display:inline-block;margin:0;height:3rem;font-family:Oswald,sans-serif;font-weight:300;font-size:3rem;color:#fff;transition:all .5s ease-in-out;padding-top:6px}.logo[_ngcontent-%COMP%]:hover{transform:scale(1.1)}.nav-links[_ngcontent-%COMP%]{list-style:none}.nav-links[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:inline-block;padding:0 .5rem;font-family:Montserrat,sans-serif;color:#fff}.intro[_ngcontent-%COMP%]{height:100vh;background:#484848;width:100%;display:flex;flex-direction:column;align-items:center}.intro-row[_ngcontent-%COMP%]{width:80%;padding:3rem;height:46vh;display:flex;justify-content:space-between;align-content:flex-end;margin-top:8vh}.intro-row[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]{flex:1 1 auto;padding:20px;display:block;width:auto;height:auto}.intro-row[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{padding:20px;width:60%}.intro-row[_ngcontent-%COMP%] > div[_ngcontent-%COMP%] > h2[_ngcontent-%COMP%]{font-weight:700}.intro-row[_ngcontent-%COMP%] > div[_ngcontent-%COMP%] > h2[_ngcontent-%COMP%], .intro-row[_ngcontent-%COMP%] > div[_ngcontent-%COMP%] > p[_ngcontent-%COMP%]{font-family:Montserrat,sans-serif;color:#fff}.intro-row[_ngcontent-%COMP%] > div[_ngcontent-%COMP%] > p[_ngcontent-%COMP%]{font-size:larger}.app[_ngcontent-%COMP%]{display:inline-block;align-self:center;width:50%;height:2rem;padding:5px;background-color:#5c6bc0;font-family:Montserrat,sans-serif;font-weight:bolder;border:none;color:#fff;border-radius:500px}.app[_ngcontent-%COMP%]:hover{background-color:#fff;color:#5c6bc0}.contact[_ngcontent-%COMP%]{height:100vh;background-color:#000;padding-top:10vh}.contact-div[_ngcontent-%COMP%]{padding:50px 0;width:100%;display:flex;justify-content:space-around}.hire[_ngcontent-%COMP%]{font-family:Montserrat,sans-serif;font-weight:bolder;font-weight:900;font-size:90px;height:70vh;word-wrap:break-word;line-height:100px;color:#fff;padding-left:2rem;width:40%}.linkedin[_ngcontent-%COMP%]{height:370px;background-color:#484848;width:300px;border-radius:6%;display:flex;flex-direction:column;align-items:center;padding:10px;transition:all .5s ease-in-out}.linkedin[_ngcontent-%COMP%]:hover{transform:scale(1.1)}.linkedin-btn[_ngcontent-%COMP%]{border-radius:5px;background-color:#fff;margin:0 3px}.linkedin-btn[_ngcontent-%COMP%]:hover{background-color:#f0f8ff;cursor:pointer}.linkedin-btn[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]{width:80px;height:30px}.avatar[_ngcontent-%COMP%]{background-image:url(http://i.stack.imgur.com/Dj7eP.jpg);width:150px;height:150px;background-size:cover;background-position:top;border-radius:50%}.l-name[_ngcontent-%COMP%]{font-family:Montserrat,sans-serif;color:#fff;padding-top:2rem;font-size:large}.l-tag[_ngcontent-%COMP%]{padding-top:20px;color:silver;padding-bottom:10px}.buttons[_ngcontent-%COMP%]{display:flex}@media only screen and (max-width:480px){.intro[_ngcontent-%COMP%]{height:200vh;background:#484848;display:flex;align-items:center}.intro[_ngcontent-%COMP%], .intro-row[_ngcontent-%COMP%]{width:100%;flex-direction:column}.intro-row[_ngcontent-%COMP%]{justify-content:center;align-content:space-around;height:92vh;padding:20px}.intro-row.second[_ngcontent-%COMP%]{flex-direction:column-reverse}.intro-row[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:80%;padding:10px;align-self:center}.intro-row[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]{padding:10px}.contact[_ngcontent-%COMP%], .contact-div[_ngcontent-%COMP%]{padding-top:20px}.contact-div[_ngcontent-%COMP%]{flex-direction:column;align-items:center;height:100%;padding-bottom:20px}.hire[_ngcontent-%COMP%]{width:100%;font-size:40px;line-height:40px;padding-left:10px;height:15vh}.linkedin[_ngcontent-%COMP%]{height:210px;display:flex;flex-direction:column}.l-name[_ngcontent-%COMP%]{padding-top:5px}.l-tag[_ngcontent-%COMP%]{padding:5px;line-height:16px}.avatar[_ngcontent-%COMP%]{width:100px;height:100px;border-radius:50%}}']}),n})()}];let b=(()=>{class n{}return n.\u0275mod=c.Ib({type:n}),n.\u0275inj=c.Hb({factory:function(t){return new(t||n)},imports:[[i.e.forChild(d)],i.e]}),n})();var p=e("bTqV");let f=(()=>{class n{}return n.\u0275mod=c.Ib({type:n}),n.\u0275inj=c.Hb({factory:function(t){return new(t||n)},imports:[[o.c,b,p.b,s.b]]}),n})()}}]);