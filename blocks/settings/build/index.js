(()=>{"use strict";var e={n:t=>{var i=t&&t.__esModule?()=>t.default:()=>t;return e.d(i,{a:i}),i},d:(t,i)=>{for(var n in i)e.o(i,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:i[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};const t=window.React,i=window.wp.element,n=window.wp.components,o=e=>(0,t.createElement)("div",{className:"integration-toolkit-for-beehiiv-settings-header",key:"settings-header"},(0,t.createElement)("div",{className:"integration-toolkit-for-beehiiv-settings-header__logo"},"Integration Toolkit for beehiiv"),(0,t.createElement)("div",{className:"integration-toolkit-for-beehiiv-settings-header__links"})),a=window.wp.apiFetch;var r=e.n(a);const s=window.wp.i18n,l=e=>{const[o,a]=(0,i.useState)(!1),[l,c]=(0,i.useState)(!1),[h,g]=(0,i.useState)(integration_toolkit_for_beehiiv_settings.api_key),[m,b]=(0,i.useState)(integration_toolkit_for_beehiiv_settings.publication_id),[v,d]=(0,i.useState)(integration_toolkit_for_beehiiv_settings.api_status),[u,_]=(0,i.useState)("");return(0,t.createElement)(t.Fragment,null,(0,t.createElement)("div",{className:"integration-toolkit-for-beehiiv-heading"},(0,t.createElement)("h1",null,"Settings"),(0,t.createElement)("p",null,(0,s.__)("Establish a connection between your WordPress website and by providing the necessary credentials.","integration-toolkit-for-beehiiv"))),(0,t.createElement)("div",{className:"integration-toolkit-for-beehiiv-tabs"},(0,t.createElement)("nav",{className:"nav-tab-wrapper"},(0,t.createElement)("a",{className:"re-nav-tab re-nav-tab-active","data-tab":"integration-toolkit-for-beehiiv-credentials",href:"#"},(0,s.__)("Beehiiv Credentials","integration-toolkit-for-beehiiv")))),(0,t.createElement)("div",{className:"integration-toolkit-for-beehiiv-settings-tabs integration-toolkit-for-beehiiv-wrapper",key:"settings-tabs"},(0,t.createElement)("div",{className:"integration-toolkit-for-beehiiv-settings-tabs-menu",key:"settings-tabs"}),u&&(0,t.createElement)(n.Snackbar,{className:"integration-toolkit-for-beehiiv-snackbar integration-toolkit-for-beehiiv-snackbar-settings",explicitDismiss:!0,onDismiss:()=>_(""),status:"success"},u),(0,t.createElement)(n.PanelRow,{className:"mt-0"},(0,t.createElement)(n.__experimentalGrid,{columns:1,style:{width:"100%"}},(0,t.createElement)(n.__experimentalInputControl,{type:"password",help:(0,s.__)("Enter the unique API key you received from. This key authorizes and facilitates the communication between your WordPress website and.","integration-toolkit-for-beehiiv"),label:(0,s.__)("API Key","integration-toolkit-for-beehiiv"),onChange:e=>g(e),placeholder:(0,s.__)("Enter your API key","integration-toolkit-for-beehiiv"),value:h}),(0,t.createElement)(n.__experimentalInputControl,{type:"password",help:(0,s.__)("Input the specific ID related to the content or publication you intend to import. This helps in pinpointing the exact data you want to fetch from.","integration-toolkit-for-beehiiv"),label:(0,s.__)("Publication ID","integration-toolkit-for-beehiiv"),placeholder:(0,s.__)("Enter your publication ID","integration-toolkit-for-beehiiv"),onChange:e=>b(e),value:m}))),(0,t.createElement)("div",{className:"integration-toolkit-for-beehiiv-settings-tabs-contents-actions"},(0,t.createElement)(n.Button,{isPrimary:!0,style:{marginRight:"1em"},onClick:()=>(()=>{const e={apiKey:h,publicationId:m,status:"connected"};a(!0),r()({path:"/rebeehiiv/v1/save_settings",method:"POST",data:e}).then((e=>{e.success?(d("connected"),a(!1)):a(!1),_(e.message)})).catch((e=>{a(!1),console.log(e)}))})(),isBusy:o,disabled:"connected"==v,className:"integration-toolkit-for-beehiiv-settings-save"},(0,s.__)("Save","integration-toolkit-for-beehiiv")),v&&(0,t.createElement)(n.Button,{style:{marginRight:"1em"},isDestructive:!0,onClick:()=>{r()({path:"/rebeehiiv/v1/disconnect_api",method:"POST"}).then((e=>{e.success?(d(!1),g(""),b("")):c(!1),_(e.message)})).catch((e=>{c(!1),console.log(e)}))},className:"integration-toolkit-for-beehiiv-settings-disconnect"},(0,s.__)("Disconnect","integration-toolkit-for-beehiiv")),(0,t.createElement)("a",{href:"https://app.beehiiv.com/settings/integrations",target:"_blank"},(0,s.__)("Get your API key","integration-toolkit-for-beehiiv")))))};var c=document.getElementById("integration-toolkit-for-beehiiv-settings");c&&(0,i.render)((0,t.createElement)((e=>(0,t.createElement)("div",{className:"integration-toolkit-for-beehiiv-settings-wrap"},(0,t.createElement)(o,null),(0,t.createElement)(l,null))),{scope:"global"}),c)})();