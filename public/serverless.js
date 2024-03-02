document.addEventListener('DOMContentLoaded', () => {
    fetchCategories();
});

function fetchCategories() {
    const url = '/.netlify/functions/fetch-categories';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const apiCallsDiv = document.getElementById('api-calls');
            apiCallsDiv.innerHTML = '';

            Object.keys(data).forEach(category => {
                const h4 = document.createElement('h4');
                h4.className = 'font-bold mt-12 pb-2 border-b border-gray-200';
                h4.textContent = category;
                apiCallsDiv.appendChild(h4);

                data[category].forEach(item => {
                    const cardDiv = document.createElement('div');
                    cardDiv.className = 'card';
                    cardDiv.innerHTML = `
                        <img src="${item.link}" alt="${item.name}" class="w-full h-32 sm:h-48 object-cover">
                        <div class="m-4">
                            <span class="font-bold">${item.name}</span>
                            <span class="block text-gray-500 text-sm">${item.description}</span>
                        </div>
                        <div class="badge">
                            <svg class="w-5 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <span>${item.days} days</span>
                        </div>
                    `;
                    apiCallsDiv.appendChild(cardDiv);
                });
            });
        })
        .catch(error => console.error('Error fetching categories:', error));
}
