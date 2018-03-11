//import Foo from './components/views/Foo';
const houseListView = () => import ('./components/view/houseListView.vue');

const houseDetail = () => import ('./components/view/houseDetail.vue');

//import NotFoundView from './components/NotFoundView';

const routers = [{
	path: '/detail',
	component: houseDetail,
	name: 'houseDetail',
    	meta: {title: '详情', auth: true}
}, {
	path: '/list',
	name: 'list',
	component: houseListView,
   	 meta: {title: '房屋详情', auth: true}
}]


export default routers;