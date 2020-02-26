let _list = [];
let _urlList = [];
let _hash = Object.create(null);

class IndexModel {


    update ($obj) {
        for (let item of $obj) {
            this.add(item);
        }
    }

    add ($item) {
        let itemData = createData($item);

        if (!_hash[itemData.url]) {
            _hash[itemData.url] = itemData;
            _list.push(itemData);
            _urlList.push(itemData.url);
            if (itemData.nextList.length !== 0) {
                for (let childItem of itemData.nextList) {
                    _urlList.push(childItem.url);
                }
            }
        }
    }

    remove (isRemove) {
        if (!isRemove) {
            return;
        }
        _list = [];
        _hash = Object.create(null);
        _urlList = [];
    }

    get list () {
        return _list;
    }

    get urlist () {
        return _urlList;
    }

    get hash () {
        return _hash;
    }

    childList ($menuNo) {

        return _hash[$menuNo].nextList;
    }
}

export default new IndexModel();

function createData ($obj) {
    var d = {};
    d.menuNo = $obj.menuNo || '';
    d.menuName = $obj.menuName || '';
    if ($obj.menuName.indexOf('-') === -1) {
        d.menuNameS = $obj.menuName;
    } else {
        d.menuNameS = $obj.menuName.substring(0, $obj.menuName.length - 2) || '';
    }

    d.icon = $obj.icon || '';
    d.url = $obj.url || '';
    d.relation = $obj.relation || '';
    d.nextList = $obj.nextList || [];
    return d;
}
