!function(){
    var list = {},
        shared_flags = {},
        shared_instances = {};

    function DependencyInjection(){
        /**
         * Задает новый сервис или параметр
         * @param id
         * @param val
         */
        this.set = function(id, val){
            list[id] = val;
        };

        /**
         * Задает новый сервис-синглтон
         * @param id
         * @param val
         */
        this.setShared = function(id, val){
            shared_flags[id]=true;
            this.set(id,val);
        };

        /**
         * Возвращает параметр или сервис
         * @param id
         * @returns {*}
         */
        this.get = function(id){
            if (!list[id]){
                throw new Error('DI: Value "'+id+'" is not defined.');
            } else {
                if ("[object Function]"===Object.prototype.toString.call(list[id])){
                    if (shared_flags[id]){
                        if (!shared_instances[id]){
                            shared_instances[id] = list[id].apply(this);
                        }
                        return shared_instances[id];
                    }
                    return list[id].apply(this);
                } else {
                    return list[id];
                }
            }
        };
    }

    window.DI = new DependencyInjection();
}();