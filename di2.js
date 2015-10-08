!function(){
    var deps = {},
        list = {};

    function DI(){

    }

    /**
     * Создает экземпляр класса и передает в конструктор заданные аргументы
     * по сути это должно вернуть "new cls(args)"
     *
     * @param cls
     * @param args
     * @returns {createInstance.F}
     */
    function createInstance(cls, args) {
        function F() {
            return cls.call(this, args);
        }
        F.prototype = cls.prototype;
        return new F();
    }

    /**
     * Задает новый сервис или параметр
     * @param name
     * @param val
     */
    DI.prototype.set = function(name, val){
        list[name] = val;
    };

    /**
     * Возвращает параметр или сервис
     * @param name
     * @param val
     * @returns {*}
     */
    DI.prototype.get = function(name, val){
        if (!list[name]){
            throw new Error('DI: Value "'+name+'" is not defined.');
        } else {
            if ("[object Function]"===Object.prototype.toString.call(list[name])){
                if (deps[name] && deps[name].length > 0){
                    var args = {};
                    for (var i= 0, l=deps[name].length; i<l; i++){
                        args[deps[name][i]] = this.get(deps[name][i]);
                    }
                    return createInstance(list[name], args);
                } else {
                    return createInstance(list[name]);
                }
            } else {
                return list[name];
            }
        }
    };

    /**
     * Устанавливает зависимости для одного из сервисов
     * @param name
     * @param dep
     */
    DI.prototype.dep = function(name, dep){
        deps[name] = dep;
    };

    /**
     * Устанавливает всё дерево зависимостей
     * @param new_deps
     */
    DI.prototype.allDeps = function(new_deps){
        deps = new_deps;
    };

    DI.prototype.toString = function(){
        return 'DI';
    };

    /**
     * Используется в конструкторе класса, чтобы установить все объекты зависимости как атрибуты класса
     * @param obj
     * @param deps
     */
    DI.prototype.loadObjDeps = function(obj, deps){
        if ('undefined'===typeof deps){
            return;
        }
        for (var k in deps){
            if (!deps.hasOwnProperty(k)){continue;}
            obj[k]=deps[k];
        }
    };

    window.DI = new DI();
}();