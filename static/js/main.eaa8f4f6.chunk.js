(this["webpackJsonptimmies-helper"]=this["webpackJsonptimmies-helper"]||[]).push([[0],{18:function(e){e.exports=JSON.parse('{"teams":[{"fullName":"Toronto Maple Leafs","abbreviation":"TOR"},{"fullName":"Carolina Hurricanes","abbreviation":"CAR"},{"fullName":"Tampa Bay Lightning","abbreviation":"TBL","timmiesAbbreviation":"TB"},{"fullName":"Florida Panthers","abbreviation":"FLA"},{"fullName":"Winnipeg Jets","abbreviation":"WPG"},{"fullName":"New York Islanders","abbreviation":"NYI"},{"fullName":"Washington Capitals","abbreviation":"WSH"},{"fullName":"Vegas Golden Knights","abbreviation":"VGK"},{"fullName":"Chicago Blackhawks","abbreviation":"CHI"},{"fullName":"Edmonton Oilers","abbreviation":"EDM"},{"fullName":"St. Louis Blues","abbreviation":"STL"},{"fullName":"Boston Bruins","abbreviation":"BOS"},{"fullName":"Philadelphia Flyers","abbreviation":"PHI"},{"fullName":"Montreal Canadiens","abbreviation":"MTL"},{"fullName":"Pittsburgh Penguins","abbreviation":"PIT"},{"fullName":"Minnesota Wild","abbreviation":"MIN"},{"fullName":"Colorado Avalanche","abbreviation":"COL"},{"fullName":"Columbus Blue Jackets","abbreviation":"CBJ"},{"fullName":"Calgary Flames","abbreviation":"CGY"},{"fullName":"Arizona Coyotes","abbreviation":"ARI"},{"fullName":"Vancouver Canucks","abbreviation":"VAN"},{"fullName":"Los Angeles Kings","abbreviation":"LAK","timmiesAbbreviation":"LA"},{"fullName":"New York Rangers","abbreviation":"NYR"},{"fullName":"Nashville Predators","abbreviation":"NSH"},{"fullName":"San Jose Sharks","abbreviation":"SJS","timmiesAbbreviation":"SJ"},{"fullName":"Ottawa Senators","abbreviation":"OTT"},{"fullName":"Detroit Red Wings","abbreviation":"DET"},{"fullName":"Anaheim Ducks","abbreviation":"ANA"},{"fullName":"New Jersey Devils","abbreviation":"NJD","timmiesAbbreviation":"NJ"},{"fullName":"Dallas Stars","abbreviation":"DAL"},{"fullName":"Buffalo Sabres","abbreviation":"BUF"}]}')},31:function(e){e.exports=JSON.parse('{"players":[{"timmiesName":"Nicholas Suzuki","firstName":"Nick","lastName":"Suzuki"},{"timmiesName":"Tim Stutzle","firstName":"Tim","lastName":"St\xfctzle"},{"timmiesName":"T.J. Brodie","firstName":"TJ","lastName":"Brodie"},{"timmiesName":"Nicholas Paul","firstName":"Nick","lastName":"Paul"},{"timmiesName":"Mathew Dumba","firstName":"Matt","lastName":"Dumba"},{"timmiesName":"Alexis Lafreniere","firstName":"Alexis","lastName":"Lafreni\xe8re"},{"timmiesName":"Alexander Wennberg","firstName":"Alex","lastName":"Wennberg"},{"timmiesName":"Zachary Aston-Reese","firstName":"Zach","lastName":"Aston-Reese"},{"timmiesName":"Maxime Comtois","firstName":"Max","lastName":"Comtois"}]}')},39:function(e,a,t){},40:function(e,a,t){},67:function(e,a,t){"use strict";t.r(a);var s=t(1),r=t.n(s),n=t(17),i=t.n(n),o=(t(39),t(40),t.p+"static/media/paypal.1bdbe2bb.png"),l=t(9),m=t(12),c=t(13),d=t(2),u=t(16),b=t(15),p=t(70),h=t(5),g=t(20),f=t(0);function y(e){var a=e.columns,t=e.data,s=Object(g.useTable)({columns:a,data:t,initialState:{sortBy:[{id:"playerGoalsPerGame",desc:!0}]}},g.useSortBy),r=s.getTableProps,n=s.getTableBodyProps,i=s.headerGroups,o=s.rows,l=s.prepareRow;return Object(f.jsxs)("table",Object(h.a)(Object(h.a)({},r()),{},{children:[Object(f.jsx)("thead",{children:i.map((function(e){return Object(f.jsx)("tr",Object(h.a)(Object(h.a)({},e.getHeaderGroupProps()),{},{children:e.headers.map((function(e){return Object(f.jsx)("th",Object(h.a)(Object(h.a)({},e.getHeaderProps(e.getSortByToggleProps())),{},{className:e.isSorted?e.isSortedDesc?"sort-desc":"sort-asc":"",children:e.render("Header")}))}))}))}))}),Object(f.jsx)("tbody",Object(h.a)(Object(h.a)({},n()),{},{children:o.map((function(e,a){return l(e),Object(f.jsx)("tr",Object(h.a)(Object(h.a)({},e.getRowProps()),{},{children:e.cells.map((function(e){return Object(f.jsx)("td",Object(h.a)(Object(h.a)({},e.getCellProps([{className:e.column.className}])),{},{children:e.render("Cell")}))}))}))}))}))]}))}var j=function(e){Object(u.a)(t,e);var a=Object(b.a)(t);function t(e){var s;return Object(m.a)(this,t),(s=a.call(this,e)).state={showList:[]},s.clickHeader=s.clickHeader.bind(Object(d.a)(s)),s}return Object(c.a)(t,[{key:"componentDidMount",value:function(){for(var e=[],a=0;a<this.props.playerLists.length;a++)e=[].concat(Object(l.a)(e),[!0]);this.setState({showList:e})}},{key:"clickHeader",value:function(e){var a=Object(l.a)(this.state.showList),t=a[e-1];a[e-1]=!t,this.setState({showList:a})}},{key:"render",value:function(){var e=this;return Object(f.jsx)("div",{children:this.props.playerLists.map((function(a){return Object(f.jsxs)("div",{className:"player-list",children:[Object(f.jsx)("h2",{className:"list-header",children:Object(f.jsxs)("a",{href:"#set"+a.id,onClick:function(t){return e.clickHeader(a.id)},children:["List ",a.id]})}),Object(f.jsx)(p.a,{in:e.state.showList[a.id-1],children:Object(f.jsx)("div",{className:"stats-list",id:"#set"+a.id,children:Object(f.jsx)(y,{data:a.players,columns:e.props.playerListColumns})})})]},a.id)}))})}}]),t}(s.Component);function v(e){var a,t=e.postponedGames.map((function(e){return Object(f.jsxs)("div",{children:["POSTPONED: ",e.teams.away.team.name," vs ",e.teams.home.team.name]},e.gamePK)}));return e.injuries&&(a=e.injuries.map((function(e){return Object(f.jsxs)("div",{children:["INJURY: ",e.player," - ",e.status," - ",e.injury]},e.ID)}))),Object(f.jsxs)("div",{className:"warnings",children:[t,a]})}var N=t(18),O=t(31),G=t(11),T=t.n(G),P=t(71),S=t(32),w=t(7),x=(s.Component,function(e){Object(u.a)(t,e);var a=Object(b.a)(t);function t(e){var s;return Object(m.a)(this,t),(s=a.call(this,e)).state={loading:!0,playerLists:[{id:"1",players:[]},{id:"2",players:[]},{id:"3",players:[]}],games:null,teams:[],errorMessage:"",currentSeason:"20202021",seasonType:"regular",currentView:"overall",trendGames:5,trendGamesInput:5,playerListColumns:null,postponedGames:null,playerInjuries:[],webInjuries:null},s.loadTimmies=s.loadTimmies.bind(Object(d.a)(s)),s.loadSetData=s.loadSetData.bind(Object(d.a)(s)),s.loadInjuryData=s.loadInjuryData.bind(Object(d.a)(s)),s.loadTeamData=s.loadTeamData.bind(Object(d.a)(s)),s.getPlayerOpponent=s.getPlayerOpponent.bind(Object(d.a)(s)),s.getTeamAbbreviation=s.getTeamAbbreviation.bind(Object(d.a)(s)),s.getTimmiesAbbreviation=s.getTimmiesAbbreviation.bind(Object(d.a)(s)),s.setOverallColumns=s.setOverallColumns.bind(Object(d.a)(s)),s.setTrendColumns=s.setTrendColumns.bind(Object(d.a)(s)),s.setTrendGames=s.setTrendGames.bind(Object(d.a)(s)),s.adjustTrendGames=s.adjustTrendGames.bind(Object(d.a)(s)),s.getLowerTrendGamesPlayed=s.getLowerTrendGamesPlayed.bind(Object(d.a)(s)),s.getTOIFromPastGames=s.getTOIFromPastGames.bind(Object(d.a)(s)),s.getValueFromPastGames=s.getValueFromPastGames.bind(Object(d.a)(s)),s.getGoalStreak=s.getGoalStreak.bind(Object(d.a)(s)),s.setCurrentView=s.setCurrentView.bind(Object(d.a)(s)),s.setSEasonType=s.setSeasonType.bind(Object(d.a)(s)),s}return Object(c.a)(t,[{key:"componentDidMount",value:function(){this.setOverallColumns(),this.loadTeamData()}},{key:"loadTeamData",value:function(){var e=this,a="https://cors.bridged.cc/https://api.nhle.com/stats/rest/en/team/summary?isAggregate=false&isGame=false&sort=%5B%7B%22property%22:%22points%22,%22direction%22:%22DESC%22%7D,%7B%22property%22:%22wins%22,%22direction%22:%22DESC%22%7D%5D&start=0&limit=50&factCayenneExp=gamesPlayed%3E=1&cayenneExp=gameTypeId=";console.log(this.state.seasonType),"playoffs"===this.state.seasonType?a+="3":a+="2",a+="%20and%20seasonId%3C="+this.state.currentSeason+"%20and%20seasonId%3E="+this.state.currentSeason,T.a.create({baseURL:a,withCredentials:!1,headers:{}}).get().then((function(a){for(var t=a.data.data,s=0;s<t.length;s++){var r=t[s].teamFullName,n=e.getTeamAbbreviation(r),i=e.getTimmiesAbbreviation(r);t[s].teamAbbr=n,t[s].timmiesAbbr=i||n}e.setState({teams:t,playerLists:[{id:"1",players:[]},{id:"2",players:[]},{id:"3",players:[]}]},e.loadTimmies())})).catch((function(a){console.log("Unable to get team stats from NHL website. Error: "+a),e.setState({errorMessage:"Sorry!  Unable to load data from the NHL website.  Please try again later."})}))}},{key:"loadInjuryData",value:function(){var e=this;T.a.get("https://cors.bridged.cc/https://www.rotowire.com/hockey/tables/injury-report.php?team=ALL&pos=ALL").then((function(a){e.setState({webInjuries:a.data},(function(){return e.loadTeamData()}))})).catch((function(a){e.loadTeamData()}))}},{key:"loadTimmies",value:function(){var e=this;T.a.post("https://cors.bridged.cc/http://ec2-54-158-170-220.compute-1.amazonaws.com/api/v1/players").then((function(a){e.loadNHLGames(a.data)})).catch((function(a){console.log(a),e.setState({errorMessage:"Sorry!  Unable to load Tims Hockey Challenge Data.  Please try again later."})}))}},{key:"loadNHLGames",value:function(e){var a=this,t=e.games;if(t.length>0){var s=t[0],r=new Date(s.startTime);r.setHours(r.getHours()-7);var n=r.toISOString().slice(0,10);T.a.get("https://cors.bridged.cc/https://statsapi.web.nhl.com/api/v1/schedule?date="+n).then((function(t){var s=t.data.dates[0].games,r=s.filter((function(e){return"Postponed"===e.status.detailedState}));a.setState({loading:!1,games:s,postponedGames:r},(function(){return a.loadSetData(e.sets)}))})).catch((function(e){console.log(e),a.setState({errorMessage:"Sorry!  Unable to load game day schedule from NHL website.  Please try again later."})}))}else this.setState({errorMessage:"No games today!"})}},{key:"loadSetData",value:function(e){var a=this;e.map((function(e){e.players.map((function(t){var s=t.firstName.trim(),r=t.lastName.trim(),n=s+" "+r,i=O.players.find((function(e){return e.timmiesName===n}));i&&(s=i.firstName,r=i.lastName,console.log("Found timmies player "+n+". Renamed to "+s+" "+r));var o="https://cors.bridged.cc/";o+="https://api.nhle.com/stats/rest/en/skater/summary?cayenneExp=gameTypeId=","playoffs"===a.state.seasonType?o+="3":o+="2",o+="%20and%20seasonId%3E="+a.state.currentSeason+"%20and%20skaterFullName%20likeIgnoreCase%20%22%25"+s+"%20"+r+"%25%22",T.a.create({baseURL:o,withCredentials:!1,headers:{}}).get().then((function(i){var o=i.data.data[0],m=t.firstName+t.lastName;if(o)m=o.playerId;else{var c={firstName:t.firstName,lastName:t.lastName,shortName:s.substring(0,1)+". "+r,position:t.position,key:m,nhldata:{teamAbbrevs:"nhl"},opponent:{teamAbbr:"nhl",goalsAgainstPerGame:0}},d=Object(l.a)(a.state.playerLists),u=d[e.id-1];u.players=[].concat(Object(l.a)(u.players),[c]),a.setState({playerLists:d})}var b="https://cors.bridged.cc/";b+="https://statsapi.web.nhl.com/api/v1/people/",b+=m,b+="?expand=person.stats&stats=","playoffs"===a.state.seasonType?b+="statsSingleSeasonPlayoffs":b+="statsSingleSeason",b=b+"&season="+a.state.currentSeason,T.a.create({baseURL:b,withCredentials:!1,headers:{}}).get().then((function(i){var c=i.data.people[0],d=c.stats[0].splits[0].stat,u=c.currentTeam.name;u.includes("Canadiens")&&(u="Montreal Canadiens");var b=N.teams.find((function(e){return e.fullName===u}));null!=b?o.teamAbbrevs=b.abbreviation:console.log("Could not find team "+u);var p="https://cors.bridged.cc/";p+="https://statsapi.web.nhl.com/api/v1/people/",p+=m,p+="/stats?stats=","playoffs"===a.state.seasonType?p+="playoffGameLog":p+="gameLog",p+="&expand=stats.team & season=",p+=a.state.currentSeason,T.a.create({baseURL:p,withCredentials:!1,headers:{}}).get().then((function(i){var c=i.data.stats[0].splits,u=null;o&&(u=a.getPlayerOpponent(o)),o.goalsPerGame=(o.goals/o.gamesPlayed).toFixed(2),o.shotsPerGame=(o.shots/o.gamesPlayed).toFixed(2),t.fullName=n,t.shortName=s.substring(0,1)+" "+r;var b={firstName:t.firstName,lastName:t.lastName,fullName:t.firstName+" "+t.lastName,shortName:s.substring(0,1)+". "+r,position:t.position,key:m,id:m,nhldata:o,statsdata:d,gamelogData:c,opponent:u},p=Object(l.a)(a.state.playerLists),h=p[e.id-1];if(h.players=[].concat(Object(l.a)(h.players),[b]),a.state.webInjuries){var g=a.state.webInjuries.find((function(e){return e.player===b.fullName}));g&&(b.injury=g)}if(b.injury){var f=[].concat(Object(l.a)(a.state.playerInjuries),[b.injury]);a.setState({playerLists:p,playerInjuries:f})}else a.setState({playerLists:p})})).catch((function(e){console.log("Game log stats failed for "+t.firstName+" "+t.lastName+". Error: "+e)}))})).catch((function(e){console.log("Player stats failed for "+t.firstName+" "+t.lastName+". Error: "+e)}))})).catch((function(e){console.log("Player search didn't work for "+t.firstName+" "+t.lastName+". Error: "+e)}))}))}))}},{key:"getTeamAbbreviation",value:function(e){var a=N.teams.find((function(a){return a.fullName===e}));return a?a.abbreviation:"MTL"}},{key:"getTimmiesAbbreviation",value:function(e){var a=N.teams.find((function(a){return a.fullName===e}));if(a)return a.timmiesAbbreviation?a.timmiesAbbreviation:""}},{key:"getPlayerOpponent",value:function(e){var a=null;if(e){var t,s=e.teamAbbrevs,r=this.state.teams.find((function(e){return e.teamAbbr===s}));if(r)(t=this.state.games.find((function(e){return e.teams.home.team.name===r.teamFullName||e.teams.away.team.name===r.teamFullName})))?a=t.teams.home.team.name===r.teamFullName?this.state.teams.find((function(e){return e.teamFullName===t.teams.away.team.name})):this.state.teams.find((function(e){return e.teamFullName===t.teams.home.team.name})):console.log("Can't find game for player "+e.skaterFullName);else console.log("Can't find player team for player "+e.skaterFullName)}return a||(console.log("Failed to get opponent for "+e.skaterFullName),console.log("Team Abbr: "+e.teamAbbrevs),a={teamAbbr:"nhl",goalsAgainstPerGame:0}),a}},{key:"setOverallColumns",value:function(){var e=[{Header:" ",id:"name",columns:[{Header:"Name",id:"playerName",accessor:"shortName",className:"player-name",Cell:function(e){return Object(f.jsxs)("div",{children:[Object(f.jsx)("img",{className:"team-logo",src:"/assets/logos/"+e.row.original.nhldata.teamAbbrevs+".png"})," ",Object(f.jsx)("a",{target:"_blank",href:"https://www.nhl.com/player/"+e.row.original.key,children:e.value})]})}},{Header:"Pos",id:"playerPosition",accessor:"position",className:"short-stat"},{Header:"GP",id:"playerGames",accessor:"nhldata.gamesPlayed",className:"short-stat"},{Header:"G",id:"playerGoals",accessor:"nhldata.goals",className:"short-stat"},{Header:"Shots/GP",id:"playerShotsPerGame",accessor:"nhldata.shotsPerGame",className:"long-stat"},{Header:"PP.TOI/GP",id:"playerPPTimePerGame",accessor:"statsdata.powerPlayTimeOnIcePerGame",className:"long-stat"},{Header:"TOI/GP",id:"playerTimePerGame",accessor:"statsdata.timeOnIcePerGame",className:"long-stat"},{Header:"Goals/GP",id:"playerGoalsPerGame",accessor:"nhldata.goalsPerGame",className:"short-stat"},{Header:"Opp.GAA",id:"playerOppGAA",accessor:"opponent.goalsAgainstPerGame",Cell:function(e){return Object(f.jsxs)("div",{children:[Object(f.jsx)("img",{className:"team-logo",src:"/assets/logos/"+e.row.original.opponent.teamAbbr+".png"})," ",e.value.toFixed(2)]})},className:"long-stat"}]}];this.setState({playerListColumns:e})}},{key:"setTrendColumns",value:function(){var e=this,a=[{Header:" ",id:"name",columns:[{Header:"Name",id:"playerName",accessor:"shortName",className:"player-name",Cell:function(e){return Object(f.jsxs)("div",{children:[Object(f.jsx)("img",{className:"team-logo",src:"/assets/logos/"+e.row.original.nhldata.teamAbbrevs+".png"})," ",Object(f.jsx)("a",{target:"_blank",href:"https://www.nhl.com/player/"+e.row.original.key,children:e.value})]})}},{Header:"Pos",id:"playerPosition",accessor:"position",className:"short-stat"},{Header:"Games",id:"games",accessor:function(a){return e.getLowerTrendGamesPlayed(a,e.state.trendGames)},className:"short-stat"},{Header:"G",id:"playerGoals",accessor:function(a){return e.getValueFromPastGames(a,"goals",e.state.trendGames)},className:"short-stat"},{Header:"Shots/GP",id:"playerShotsPerGame",accessor:function(a){return(e.getValueFromPastGames(a,"shots",e.state.trendGames)/e.getLowerTrendGamesPlayed(a,e.state.trendGames)).toFixed(2)},className:"long-stat"},{Header:"PP.TOI/GP",id:"playerPPTimePerGame",accessor:function(a){return e.getTOIFromPastGames(a,"powerPlayTimeOnIce",e.state.trendGames)},className:"long-stat"},{Header:"TOI/GP",id:"playerTimePerGame",accessor:function(a){return e.getTOIFromPastGames(a,"timeOnIce",e.state.trendGames)},className:"long-stat"},{Header:"Goals/GP",id:"playerGoalsPerGame",accessor:function(a){return(e.getValueFromPastGames(a,"goals",e.state.trendGames)/e.getLowerTrendGamesPlayed(a,e.state.trendGames)).toFixed(2)},className:"short-stat"},{Header:"Opp.Season GAA",id:"playerOppGAA",accessor:"opponent.goalsAgainstPerGame",Cell:function(e){return Object(f.jsxs)("div",{children:[Object(f.jsx)("img",{className:"team-logo",src:"/assets/logos/"+e.row.original.opponent.teamAbbr+".png"})," ",e.value.toFixed(2)]})},className:"long-stat"}]}];this.setState({playerListColumns:a})}},{key:"getValueFromPastGames",value:function(e,a,t){var s=e.gamelogData;if(!s)return 0;for(var r=0,n=t<=s.length?t:s.length,i=0;i<=n-1;i++){var o=s[i].stat;r+=parseInt(o[a])}return r}},{key:"getTOIFromPastGames",value:function(e,a,t){var s=e.gamelogData;if(!s)return 0;for(var r=0,n=0,i=t<=s.length?t:s.length,o=0;o<=i-1;o++){var l=s[o].stat[a].split(":"),m=l[0],c=l[1];r+=parseInt(m),n+=parseInt(c)}var d=(n+60*r)/this.getLowerTrendGamesPlayed(e,t),u=d/60,b=d%60;return Math.floor(u)+":"+Math.floor(b).toString().padStart(2,"0")}},{key:"getGoalStreak",value:function(e){return e.gamelogData.length,0}},{key:"getGoalsPerGameVsOpponent",value:function(e){e.opponent;return e.gamelogData.length,0}},{key:"setCurrentView",value:function(e){var a=this;e!=this.state.currentView&&this.setState({currentView:e},(function(){"trend"===e?a.setTrendColumns():a.setOverallColumns()}))}},{key:"getLowerTrendGamesPlayed",value:function(e,a){return a<e.nhldata.gamesPlayed?a:e.nhldata.gamesPlayed}},{key:"adjustTrendGames",value:function(e){var a=parseInt(this.state.trendGames)+parseInt(e);a>0&&this.setTrendGames(a)}},{key:"setTrendGames",value:function(e){var a=this,t=parseInt(e);Number.isInteger(t)?t>0&&this.setState({trendGamesInput:t,trendGames:t},(function(){return a.setTrendColumns()})):""===e&&this.setState({trendGamesInput:e})}},{key:"setSeasonType",value:function(e){var a=this;e!=this.state.seasonType&&(console.log("set season type: "+e),this.setState({seasonType:e},(function(){return a.loadTeamData()})))}},{key:"render",value:function(){var e=this,a=Object(f.jsx)("div",{children:"ok"});if(this.state.errorMessage)a=Object(f.jsx)("div",{className:"error-message",children:this.state.errorMessage});else if(this.state.loading)a=Object(f.jsx)("div",{children:Object(f.jsx)("img",{src:"https://miro.medium.com/max/882/1*9EBHIOzhE1XfMYoKz1JcsQ.gif",alt:"loading..."})});else{var t,s;"trend"===this.state.currentView&&(t=Object(f.jsxs)("div",{className:"trend-settings",children:[Object(f.jsx)(P.a,{variant:"light",onClick:function(){return e.adjustTrendGames(-1)},children:"-"}),"Last ",Object(f.jsx)("input",{className:"trend-games",value:this.state.trendGamesInput,onChange:function(a){e.setTrendGames(a.target.value)}})," Games",Object(f.jsx)(P.a,{variant:"light",onClick:function(){return e.adjustTrendGames(1)},children:"+"})]})),(this.state.postponedGames||this.state.playerInjuries)&&(s=Object(f.jsx)(v,{postponedGames:this.state.postponedGames,injuries:this.state.playerInjuries})),a=Object(f.jsxs)("div",{children:[s,Object(f.jsxs)("div",{className:"settings-buttons",children:[Object(f.jsx)(P.a,{onClick:function(a){return e.setSeasonType("regular")},variant:"regular"===this.state.seasonType?"dark":"light",children:"Regular Season"}),Object(f.jsx)(P.a,{onClick:function(a){return e.setSeasonType("playoffs")},variant:"playoffs"===this.state.seasonType?"dark":"light",children:"Playoffs"})]}),Object(f.jsxs)("div",{className:"settings-buttons",children:[Object(f.jsx)(P.a,{onClick:function(a){return e.setCurrentView("overall")},variant:"overall"===this.state.currentView?"dark":"light",children:"Overall"}),Object(f.jsx)(P.a,{onClick:function(a){return e.setCurrentView("trend")},variant:"trend"===this.state.currentView?"dark":"light",children:"Trend"})]}),t,Object(f.jsx)(j,{playerLists:this.state.playerLists,games:this.state.games,teams:this.state.teams,playerListColumns:this.state.playerListColumns})]})}return a}}]),t}(s.Component));t(66);var k=function(){return Object(f.jsxs)("div",{className:"App",children:[Object(f.jsx)("link",{rel:"stylesheet",href:"https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css",integrity:"sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l",crossOrigin:"anonymous"}),Object(f.jsx)("header",{className:"app-title",children:"Tim Horton's Hockey Challenge Helper"}),Object(f.jsxs)("div",{children:[Object(f.jsx)(x,{}),Object(f.jsxs)("footer",{className:"footer",children:[Object(f.jsxs)("div",{children:["Questions? Suggestions? Find me on ",Object(f.jsx)("a",{href:"//www.twitter.com/Zorbane",target:"_blank",children:"Twitter"})]}),Object(f.jsxs)("div",{children:["Buy me Timmies? ",Object(f.jsx)("a",{href:"https://www.paypal.com/paypalme/zorbane/",target:"_blank",children:Object(f.jsx)("img",{className:"paypal-logo",src:o})})]})]})]})]})},C=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,72)).then((function(a){var t=a.getCLS,s=a.getFID,r=a.getFCP,n=a.getLCP,i=a.getTTFB;t(e),s(e),r(e),n(e),i(e)}))};i.a.render(Object(f.jsx)(r.a.StrictMode,{children:Object(f.jsx)(k,{})}),document.getElementById("root")),C()}},[[67,1,2]]]);
//# sourceMappingURL=main.eaa8f4f6.chunk.js.map