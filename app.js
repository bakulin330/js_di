!function(){
    function AppClass(deps){
        DI.loadObjDeps(this,deps);
    }

    AppClass.prototype.setArea = function(area){
        if (null===this.area){
            this.area = area;
        }
    };

    function AreaClass(deps){
        DI.loadObjDeps(this,deps);
        this.name = 'area';
    }

    function Variant(deps){
        DI.loadObjDeps(this,deps);
        this.name = 'Variant';
    }

    function Cont(deps){
        DI.loadObjDeps(this,deps);
        this.name = 'Cont';
    }

    function Incon(deps){
        DI.loadObjDeps(this,deps);
        this.name = 'Incon';
    }

    DI.set('app',AppClass);
    DI.set('area',AreaClass);
    DI.set('variant',Variant);
    DI.set('cont',Cont);
    DI.set('incon',Incon);

    DI.allDeps({
        'app':['area'],
        'area':['variant']
    });
    DI.dep('variant',['cont','incon'])

    var app = DI.get('app');
    window.App = app;
    console.log('App', App);
}();