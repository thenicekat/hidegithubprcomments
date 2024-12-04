dbName = 'TurboFrameStateDB';

function initializeDatabase() {
    let request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = function (event) {
        db = event.target.result;
        if (!db.objectStoreNames.contains('turboFrameStates')) {
            db.createObjectStore('turboFrameStates', { keyPath: 'id' });
        }
    };

    request.onsuccess = function (event) {
        db = event.target.result;
        initializeUI();
    };

    request.onerror = function (event) {
        console.error('IndexedDB error:', event.target.error);
    };
}

function saveState(id, hidden) {
    let transaction = db.transaction(['turboFrameStates'], 'readwrite');
    let store = transaction.objectStore('turboFrameStates');
    store.put({ id, hidden });
}

function getState(id, callback) {
    let transaction = db.transaction(['turboFrameStates'], 'readonly');
    let store = transaction.objectStore('turboFrameStates');
    let request = store.get(id);

    request.onsuccess = function () {
        callback(request.result ? request.result.hidden : false);
    };
}

function initializeUI() {
    let turboFrameElements = document.getElementsByTagName('turbo-frame');

    for (let i = 0; i < turboFrameElements.length; i++) {
        let element = turboFrameElements[i];
        let id = element.getAttribute('id');

        if (id && id.startsWith('review-thread-or-comment')) {
            let button = document.createElement('button');
            button.textContent = 'Hide';
            button.style.margin = '10px';

            button.addEventListener('click', function () {
                let isHidden = element.style.display === 'none';
                if (!isHidden) {
                    element.style.display = 'none';
                }
                saveState(id, !isHidden);
            });

            element.appendChild(button);
        }
    }
}

initializeDatabase();
