(this["webpackJsonptimmies-helper"]=this["webpackJsonptimmies-helper"]||[]).push([[0],{17:function(e){e.exports=JSON.parse('{"teams":[{"fullName":"Toronto Maple Leafs","abbreviation":"TOR"},{"fullName":"Carolina Hurricanes","abbreviation":"CAR"},{"fullName":"Tampa Bay Lightning","abbreviation":"TBL","timmiesAbbreviation":"TB"},{"fullName":"Florida Panthers","abbreviation":"FLA"},{"fullName":"Winnipeg Jets","abbreviation":"WPG"},{"fullName":"New York Islanders","abbreviation":"NYI"},{"fullName":"Washington Capitals","abbreviation":"WSH"},{"fullName":"Vegas Golden Knights","abbreviation":"VGK"},{"fullName":"Chicago Blackhawks","abbreviation":"CHI"},{"fullName":"Edmonton Oilers","abbreviation":"EDM"},{"fullName":"St. Louis Blues","abbreviation":"STL"},{"fullName":"Boston Bruins","abbreviation":"BOS"},{"fullName":"Philadelphia Flyers","abbreviation":"PHI"},{"fullName":"Montreal Canadiens","abbreviation":"MTL"},{"fullName":"Pittsburgh Penguins","abbreviation":"PIT"},{"fullName":"Minnesota Wild","abbreviation":"MIN"},{"fullName":"Colorado Avalanche","abbreviation":"COL"},{"fullName":"Columbus Blue Jackets","abbreviation":"CBJ"},{"fullName":"Calgary Flames","abbreviation":"CGY"},{"fullName":"Arizona Coyotes","abbreviation":"ARI"},{"fullName":"Vancouver Canucks","abbreviation":"VAN"},{"fullName":"Los Angeles Kings","abbreviation":"LAK","timmiesAbbreviation":"LA"},{"fullName":"New York Rangers","abbreviation":"NYR"},{"fullName":"Nashville Predators","abbreviation":"NSH"},{"fullName":"San Jose Sharks","abbreviation":"SJS","timmiesAbbreviation":"SJ"},{"fullName":"Ottawa Senators","abbreviation":"OTT"},{"fullName":"Detroit Red Wings","abbreviation":"DET"},{"fullName":"Anaheim Ducks","abbreviation":"ANA"},{"fullName":"New Jersey Devils","abbreviation":"NJD","timmiesAbbreviation":"NJ"},{"fullName":"Dallas Stars","abbreviation":"DAL"},{"fullName":"Buffalo Sabres","abbreviation":"BUF"}]}')},27:function(e){e.exports=JSON.parse('{"players":[{"timmiesName":"Nicholas Suzuki","firstName":"Nick","lastName":"Suzuki"},{"timmiesName":"Tim Stutzle","firstName":"Tim","lastName":"St\ufffdtzle"},{"timmiesName":"T.J. Brodie","firstName":"TJ","lastName":"Brodie"},{"timmiesName":"Nicholas Paul","firstName":"Nick","lastName":"Paul"}]}')},32:function(e,a,t){},33:function(e,a,t){},54:function(e,a,t){"use strict";t.r(a);var s=t(1),i=t.n(s),n=t(26),r=t.n(n),l=(t(32),t(33),t(10)),o=t(5),m=t(6),c=t(2),b=t(8),d=t(7),u=t(11),p=t(3),h=t(0),f=function(e){Object(b.a)(t,e);var a=Object(d.a)(t);function t(e){var s;return Object(o.a)(this,t),(s=a.call(this,e)).state={gamesplayed:0,goals:0},s.getGoalsPerGame=s.getGoalsPerGame.bind(Object(c.a)(s)),s.getShotsPerGame=s.getShotsPerGame.bind(Object(c.a)(s)),s.getGamesPlayed=s.getGamesPlayed.bind(Object(c.a)(s)),s.getGoals=s.getGoals.bind(Object(c.a)(s)),s.getOpponentGAA=s.getOpponentGAA.bind(Object(c.a)(s)),s}return Object(m.a)(t,[{key:"getGamesPlayed",value:function(){return this.props.player.nhldata?this.props.player.nhldata.gamesPlayed:0}},{key:"getGoals",value:function(){return this.props.player.nhldata?this.props.player.nhldata.goals:0}},{key:"getGoalsPerGame",value:function(){return this.props.player.nhldata&&0!==this.props.player.nhldata.gamesPlayed?(this.props.player.nhldata.goals/this.props.player.nhldata.gamesPlayed).toFixed(2):0}},{key:"getShotsPerGame",value:function(){return this.props.player.nhldata&&0!==this.props.player.nhldata.gamesPlayed?(this.props.player.nhldata.shots/this.props.player.nhldata.gamesPlayed).toFixed(2):0}},{key:"getOpponentGAA",value:function(){return this.props.opponent?this.props.opponent.goalsAgainstPerGame.toFixed(2):"N/A"}},{key:"render",value:function(){return Object(h.jsxs)(u.a,{children:[Object(h.jsxs)(p.a,{xs:"3",children:[this.props.player.firstName.substring(0,1),". ",this.props.player.lastName]}),Object(h.jsx)(p.a,{xs:"1",children:this.props.player.position}),Object(h.jsxs)(p.a,{xs:"2",children:[" ",this.getGamesPlayed()]}),Object(h.jsx)(p.a,{xs:"1",children:this.getGoals()}),Object(h.jsx)(p.a,{xs:"1",children:this.getShotsPerGame()}),Object(h.jsx)(p.a,{xs:"1",children:this.getGoalsPerGame()}),Object(h.jsx)(p.a,{xs:"2",children:this.getOpponentGAA()})]})}}]),t}(s.Component),v=function(e){Object(b.a)(t,e);var a=Object(d.a)(t);function t(e){return Object(o.a)(this,t),a.call(this,e)}return Object(m.a)(t,[{key:"render",value:function(){var e=this;return Object(h.jsxs)("div",{children:[Object(h.jsxs)(u.a,{children:[Object(h.jsx)(p.a,{xs:"3",children:"Name"}),Object(h.jsx)(p.a,{xs:"1",children:"Pos"}),Object(h.jsx)(p.a,{xs:"2",children:"Games Played"}),Object(h.jsx)(p.a,{xs:"1",children:"Goals"}),Object(h.jsx)(p.a,{xs:"1",children:"Shots/GP"}),Object(h.jsx)(p.a,{xs:"1",children:"Goals/GP"}),Object(h.jsx)(p.a,{xs:"2",children:"Opp. GAA"})]}),this.props.players.sort((function(e,a){return(e.nhldata?e.nhldata.goals/e.nhldata.gamesPlayed:0)-(a.nhldata?a.nhldata.goals/a.nhldata.gamesPlayed:0)})).reverse().map((function(a,t){var s=null;if(a.nhldata){var i=a.nhldata.teamAbbrevs,n=e.props.teams.find((function(e){return e.teamAbbr===i}));if(n){var r=e.props.games.find((function(e){return e.teams.home.abbr===n.timmiesAbbr||e.teams.away.abbr===n.timmiesAbbr}));r&&(s=r.teams.home.abbr===i?e.props.teams.find((function(e){return e.timmiesAbbr===r.teams.away.abbr})):e.props.teams.find((function(e){return e.timmiesAbbr===r.teams.home.abbr})))}}return s||(a.nhldata?(console.log("Failed to get opponent for "+a.firstName+" "+a.lastName),console.log("Team Abbr: "+a.nhldata.teamAbbrevs)):console.log("No NHL data for "+a.firstName+" "+a.lastName)),Object(h.jsx)(f,{player:a,opponent:s},a.key)}))]})}}]),t}(s.Component),g=function(e){Object(b.a)(t,e);var a=Object(d.a)(t);function t(e){var s;return Object(o.a)(this,t),(s=a.call(this,e)).state={showList:[]},s.clickHeader=s.clickHeader.bind(Object(c.a)(s)),s}return Object(m.a)(t,[{key:"componentDidMount",value:function(){for(var e=[],a=0;a<this.props.playerLists.length;a++)e=[].concat(Object(l.a)(e),[!0]);this.setState({showList:e})}},{key:"clickHeader",value:function(e){var a=Object(l.a)(this.state.showList),t=a[e-1];a[e-1]=!t,this.setState({showList:a})}},{key:"render",value:function(){var e=this;return Object(h.jsx)("div",{children:this.props.playerLists.map((function(a){return Object(h.jsxs)("div",{className:"player-list",children:[Object(h.jsx)("h2",{className:"list-header",children:Object(h.jsxs)("a",{href:"#",onClick:function(t){return e.clickHeader(a.id)},children:["List ",a.id]})}),Object(h.jsx)("div",{children:e.state.showList[a.id-1]&&Object(h.jsx)(v,{players:a.players,games:e.props.games,teams:e.props.teams})})]})}))})}}]),t}(s.Component),j=t(17),N=t(27),y=t(15),O=t.n(y),x=function(e){Object(b.a)(t,e);var a=Object(d.a)(t);function t(e){var s;return Object(o.a)(this,t),(s=a.call(this,e)).state={loading:!0,playerLists:[{id:"1",players:[]},{id:"2",players:[]},{id:"3",players:[]}],games:null,teams:[],errorMessage:""},s.loadTimmies=s.loadTimmies.bind(Object(c.a)(s)),s.loadSetData=s.loadSetData.bind(Object(c.a)(s)),s.loadTeamData=s.loadTeamData.bind(Object(c.a)(s)),s.getTeamAbbreviation=s.getTeamAbbreviation.bind(Object(c.a)(s)),s.getTimmiesAbbreviation=s.getTimmiesAbbreviation.bind(Object(c.a)(s)),s}return Object(m.a)(t,[{key:"componentDidMount",value:function(){this.loadTimmies(),this.loadTeamData()}},{key:"loadTimmies",value:function(){var e=this;O.a.post("https://cors.bridged.cc/http://ec2-54-158-170-220.compute-1.amazonaws.com/api/v1/players").then((function(a){e.setState({loading:!1,games:a.data.games}),e.loadSetData(a.data.sets)})).catch((function(a){e.setState({errorMessage:"Something went wrong. Error: "+a})}))}},{key:"loadTeamData",value:function(){var e=this;O.a.create({baseURL:"https://cors.bridged.cc/https://api.nhle.com/stats/rest/en/team/summary?isAggregate=false&isGame=false&sort=%5B%7B%22property%22:%22points%22,%22direction%22:%22DESC%22%7D,%7B%22property%22:%22wins%22,%22direction%22:%22DESC%22%7D%5D&start=0&limit=50&factCayenneExp=gamesPlayed%3E=1&cayenneExp=gameTypeId=2%20and%20seasonId%3C=20202021%20and%20seasonId%3E=20202021",withCredentials:!1,headers:{}}).get().then((function(a){for(var t=a.data.data,s=0;s<t.length;s++){var i=t[s].teamFullName,n=e.getTeamAbbreviation(i),r=e.getTimmiesAbbreviation(i);t[s].teamAbbr=n,t[s].timmiesAbbr=r||n}e.setState({teams:t})})).catch((function(e){console.log("Unable to get team stats from NHL website. Error: "+e)}))}},{key:"getTeamAbbreviation",value:function(e){var a=j.teams.find((function(a){return a.fullName===e}));return a?a.abbreviation:"MTL"}},{key:"getTimmiesAbbreviation",value:function(e){var a=j.teams.find((function(a){return a.fullName===e}));if(a)return a.timmiesAbbreviation?a.timmiesAbbreviation:""}},{key:"loadSetData",value:function(e){var a=this;e.map((function(e){e.players.map((function(t){var s=t.firstName.trim(),i=t.lastName.trim(),n=s+" "+i,r=N.players.find((function(e){return e.timmiesName===n}));r&&(s=r.firstName,i=r.lastName);var o="https://cors.bridged.cc/https://api.nhle.com/stats/rest/en/skater/summary?cayenneExp=gameTypeId=2%20and%20seasonId%3E=20202021%20and%20skaterFullName%20likeIgnoreCase%20%22%25"+s+"%20"+i+"%25%22";O.a.create({baseURL:o,withCredentials:!1,headers:{}}).get().then((function(s){var i=s.data.data[0],n=t.firstName+t.lastName;i&&(n=i.playerId);var r={firstName:t.firstName,lastName:t.lastName,position:t.position,key:n,nhldata:i},o=Object(l.a)(a.state.playerLists),m=o[e.id-1];m.players=[].concat(Object(l.a)(m.players),[r]),a.setState({playerLists:o})})).catch((function(e){console.log("Player get didn't work for "+t.firstName+" "+t.lastName+". Error: "+e)}))}))}))}},{key:"render",value:function(){return this.state.loading?Object(h.jsx)("div",{children:Object(h.jsx)("img",{src:"https://miro.medium.com/max/882/1*9EBHIOzhE1XfMYoKz1JcsQ.gif",alt:"loading..."})}):this.state.errorMessage?Object(h.jsx)("div",{children:this.state.errorMessage}):Object(h.jsx)("div",{children:Object(h.jsx)(g,{playerLists:this.state.playerLists,games:this.state.games,teams:this.state.teams})})}}]),t}(s.Component);t(53);var A=function(){return Object(h.jsxs)("div",{className:"App",children:[Object(h.jsx)("link",{rel:"stylesheet",href:"https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css",integrity:"sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l",crossorigin:"anonymous"}),Object(h.jsx)("header",{children:"Timmies Helper App"}),Object(h.jsx)("div",{children:Object(h.jsx)(x,{})})]})},k=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,56)).then((function(a){var t=a.getCLS,s=a.getFID,i=a.getFCP,n=a.getLCP,r=a.getTTFB;t(e),s(e),i(e),n(e),r(e)}))};r.a.render(Object(h.jsx)(i.a.StrictMode,{children:Object(h.jsx)(A,{})}),document.getElementById("root")),k()}},[[54,1,2]]]);
//# sourceMappingURL=main.25b4364d.chunk.js.map