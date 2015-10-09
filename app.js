!function(){
    function AppClass(deps){
//        this.area = null;
    }

    AppClass.prototype.setArea = function(area){
        if ('undefined'===typeof this.area || null===this.area){
            this.area = area;
        }
    };

    function AreaClass(deps){
        this.name = 'area';
        this.variant = null;
    }

    function Variant(deps){
        this.name = 'Variant';
        this.cont = null;
        this.incon = null;
    }

    function Cont(deps){
        this.name = 'Cont';
    }

    function Incon(deps){
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