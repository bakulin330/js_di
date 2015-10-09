!function () {
    var deps = {},
        list = {};

    function DI() {

    }

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * Задает новый сервис или параметр
     * @param name
     * @param val
     */
    DI.prototype.set = function (name, val) {
        list[name] = val;
    };

    /**
     * Возвращает параметр или сервис
     * @param name
     * @param val
     * @returns {*}
     */
    DI.prototype.get = function (name, val) {
        if (!list[name]) {
            throw new Error('DI: Value "' + name + '" is not defined.');
        } else {
            if ("[object Function]" === Object.prototype.toString.call(list[name])) {
                if (deps[name] && deps[name].length > 0) {
                    var obj = new list[name], setter;

                    for (var i = 0, l = deps[name].length; i < l; i++) {
                        setter = 'set' + capitalizeFirstLetter(deps[name][i]);

                        if ("[object Function]" === Object.prototype.toString.call(obj[setter])) {
                            obj[setter](this.get(deps[name][i]));
                        } else {
                            if ('undefined' !== typeof obj[deps[name][i]]){
                                obj[deps[name][i]] = this.get(deps[name][i]);
                            } else {
                                throw new Error('Can\'t inject dependency "'+deps[name][i]+'" into "'+name+'": you should create metod "'+setter+'" or define attribute "'+deps[name][i]+'".');
                            }
                        }
                    }

                    return obj;
                } else {
                    return new list[name];
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
    DI.prototype.dep = function (name, dep) {
        deps[name] = dep;
    };

    /**
     * Устанавливает всё дерево зависимостей
     * @param new_deps
     */
    DI.prototype.allDeps = function (new_deps) {
        deps = new_deps;
    };

    DI.prototype.toString = function () {
        return 'DI';
    };

    window.DI = new DI();
}();