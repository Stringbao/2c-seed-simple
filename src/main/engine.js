

import Services from "@services/index.js";
import ViewFactory from "@view/factory";
import List from "@model/list";

class Engine{
    constructor(){
        this._terminal  = ViewFactory.getTerminal();
    }

    notify(){
        flash_fe_core_tool.$event_publisher.on($MAP.EVENT_KEY.DETAIL, (model)=>{
            this._info.update(model._data);
            this._infoView.render();
        });
    }

    init(rootContainer){
        this._rootContainer = $(rootContainer);
        this.readyToRender();
    }

    initModel(data){
        this._list = new List();
        this._list.setData(data);
        this._info = Services.getDefaultItem(this._list);
    }

    readyToRender(){
        Services.getData(this).then(()=>{
            this._listView = new ViewFactory().create($MAP.MODEL_TYPES.LIST.TYPE, this._list);
            this._infoView = new ViewFactory().create($MAP.MODEL_TYPES.INFO.TYPE, this._info);
            this._listView.init();
            this._infoView.init();
            
            this.notify();
        }).catch(err=>{
            console.log(err, "get data error");
        })
    }
}

export default Engine;