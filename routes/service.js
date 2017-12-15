((factory) => {
    if (typeof define === 'function' && define.amd) {
        //console.log('AMD!');
        // AMD
        define(factory);
    } else if (typeof exports === 'object') {
        //console.log('CommonJS!');
        // CommonJS
        module.exports = factory();
    } else {
        //console.log('Browser globals!');
        // Browser globals
        factory();
    }
})(() => {
    let heroList = [
        { id: '01', name: 'Nice' },
        { id: '12', name: 'Narco' },
        { id: '19', name: 'Magma' },
        { id: '15', name: 'Magneta' },
        { id: '16', name: 'RubberMan' },
        { id: '17', name: 'Dynama' },
        { id: '13', name: 'Bombasto' },
        { id: '14', name: 'Celeritas' },
        { id: '18', name: 'Dr IQ' },
        { id: '20', name: 'Tornado' }
    ]

    const mockDao = {
        query() {
            return heroList
        },
        insert(hero) {
            heroList.push(hero)
            return true
        },
        updat(hero) {
            let rtn = false
            let list = heroList.map(o => {
                rtn = true
                if (o.id === hero.id) {
                    o = hero
                }
                return o
            })
            heroList = list
            return rtn
        },
        delete(id) {
            let list = [...heroList]
            let rtn = false;
            let index = list.findIndex(o => o.id == id)
            if (index > -1) {
                list.splice(index, 1);

                heroList = list;
                rtn = true;
            }
            return rtn;
        }

    }

    return {
        getList() {
            return mockDao.query();
        },
        addHero(hero) {
            return mockDao.insert(hero)
        },
        updateHero(hero) {
           return mockDao.updat(hero)
        },
        removeHero(id) {
           return mockDao.delete(id)
        }
    }
})