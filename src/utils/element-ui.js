import 'element-ui/lib/theme-chalk/index.css';
import {
    Button,
    Form,
    FormItem,
    Input,
    Tabs,
    TabPane,
    Row,
    Col,
    Select,
    Option,
    Container,
    Header,
    Footer,
    // Message,
    Notification
  } from 'element-ui'
  
  Vue.use(Button)
    .use(Form)
    .use(FormItem)
    .use(Input)
    .use(Tabs)
    .use(TabPane)
    .use(Row)
    .use(Col)
    .use(Select)
    .use(Option)
    .use(Container)
    .use(Header)
    .use(Footer)
    
Vue.prototype.$notify = Notification