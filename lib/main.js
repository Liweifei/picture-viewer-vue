import Main from '../src/App.vue';

//凡是vue插件一定有这个方法。目的是use使用，fn直接当作install方法，返回对象的话就需要个install方法
let instance;
const PictureViewer = function (Vue) {

    Vue.prototype.$viewImg = function (url) {
        const factory = Vue.extend(Main);//创建组件构造器
        let option={//传递删除dom方法过去
            onClose(){
                PictureViewer.close()
            }
        }
        const c = new factory({
            data:option
        });//从构造器拿到新的组件
        instance = c.$mount(document.createElement("div"));//挂载到空元素上
        document.body.appendChild(instance.$el); //将dom添加到body上
        instance.url = url;
        instance.visible = true;
    }

    //     var opt={
    //         duration:3000
    //     }

    //     for(var key in options){
    //         opt[key]=options[key];
    //     }
    // //挂载在原型上  使用的时候this.$toast
    // Vue.prototype.$toast = function (message,option) {

    //     if(typeof option=="object"){
    //         for(var key in option){
    //             opt[key]=option[key];
    //         }
    //     }
    //     //Vue.extend可以继承这个组件，然后得到一个新的组件
    //     const ToastController = Vue.extend(ToastComponent);
    //     //创建一个新的实例，实例挂载在一个空的div
    //     var instance = new ToastController().$mount(document.createElement("div"));

    //     instance.message = message;
    //     instance.visible = true;
    //     document.body.appendChild(instance.$el); //将div添加到dom中
    //     setTimeout(()=>{
    //         instance.visible = false;
    //         setTimeout(()=>{
    //             document.body.removeChild(instance.$el)
    //         },500)
    //     },6000)
    // }
    // Vue.prototype.$toast['show'] = function (message,option) {
    //     return Vue.prototype.$toast(message,option);
    // }
}
PictureViewer.close=function(){//关闭后删除dom
    // console.log("执行了close");
    if(instance && instance.$el){
        document.body.removeChild(instance.$el);
    }
}
export default PictureViewer;