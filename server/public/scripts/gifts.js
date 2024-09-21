const renderGifts = async () => {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return; // Exit if the element doesn't exist

    try {
        const response = await fetch('/gifts');
        if (!response.ok) {
            console.error('Failed to fetch gifts:', response.statusText);
            return;
        }
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
            data.forEach(gift => {
                const card = document.createElement('div');
                card.classList.add('card');

                const topContainer = document.createElement('div');
                topContainer.classList.add('top-container');

                const bottomContainer = document.createElement('div');
                bottomContainer.classList.add('bottom-container');

                topContainer.style.backgroundImage = `url(${gift.image})`;

                const name = document.createElement('h3');
                name.textContent = gift.name;
                bottomContainer.appendChild(name);

                const pricePoint = document.createElement('p');
                pricePoint.textContent = 'Price: ' + gift.pricePoint;
                bottomContainer.appendChild(pricePoint);

                const audience = document.createElement('p');
                audience.textContent = 'Great For: ' + gift.audience;
                bottomContainer.appendChild(audience);

                const link = document.createElement('a');
                link.textContent = 'Read More >';
                link.setAttribute('role', 'button');
                link.href = `/gifts/${gift.id}`;
                bottomContainer.appendChild(link);

                card.appendChild(topContainer);
                card.appendChild(bottomContainer);
                mainContent.appendChild(card);
            });
        } else {
            const message = document.createElement('h2');
            message.textContent = 'No Gifts Available 😞';
            mainContent.appendChild(message);
        }
    } catch (error) {
        console.error('Error rendering gifts:', error);
    }
};

const renderGift = async () => {
    const giftContent = document.getElementById('gift-content');
    if (!giftContent) return; // Exit if the element doesn't exist

    try {
        const urlSegments = window.location.href.split('/').filter(Boolean);
        const requestedID = parseInt(urlSegments.pop());
        if (isNaN(requestedID)) {
            console.error('Invalid gift ID');
            return;
        }

        const response = await fetch('/gifts');
        if (!response.ok) {
            console.error('Failed to fetch gifts:', response.statusText);
            return;
        }
        const data = await response.json();

        const gift = data.find(gift => gift.id === requestedID);

        if (gift) {
            document.getElementById('image').src = gift.image;
            document.getElementById('name').textContent = gift.name;
            document.getElementById('submittedBy').textContent = 'Submitted by: ' + gift.submittedBy;
            document.getElementById('pricePoint').textContent = 'Price: ' + gift.pricePoint;
            document.getElementById('audience').textContent = 'Great For: ' + gift.audience;
            document.getElementById('description').textContent = gift.description;
            document.title = `UnEarthed - ${gift.name}`;
        } else {
            const message = document.createElement('h2');
            message.textContent = 'Gift Not Found 😞';
            giftContent.appendChild(message);
        }
    } catch (error) {
        console.error('Error rendering gift:', error);
    }
};

if (document.getElementById('main-content')) {
    renderGifts();
}

if (document.getElementById('gift-content')) {
    renderGift();
}