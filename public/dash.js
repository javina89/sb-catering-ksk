document.addEventListener('DOMContentLoaded', () => {
    fetchCategories();
});

// function fetchCategories() {
//     fetch('https://corsproxy.io/?https://raw.githubusercontent.com/javina89/sb-json/main/catering.json')
//         .then(response => response.json())
//         .then(categories => {
//             const container = document.getElementById('categories-container');
//             categories.forEach(category => {
//                 const div = document.createElement('div');
//                 div.textContent = category.name;
//                 container.appendChild(div);
//             });
//         })
//         .catch(error => console.error('Error fetching categories:', error));
// }

function fetchCategories() {
    // Assuming you have a working URL or a server-side endpoint that circumvents CORS
    const url = 'https://corsproxy.io/?https://raw.githubusercontent.com/javina89/sb-json/main/catering.json'; // Replace with the actual URL to your JSON file

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Get the div where you want to insert the <h4> elements
            const apiCallsDiv = document.getElementById('api-calls');
            // Ensure the div is empty before adding new content
            apiCallsDiv.innerHTML = '';

            // Get all top-level keys
            const topLevelKeys = Object.keys(data);

            topLevelKeys.forEach(category => {
                // Create an <h4> element for each category
                const h4 = document.createElement('h4');
                h4.className = 'font-bold mt-12 pb-2 border-b border-gray-200';
                h4.textContent = category; // Use the category as the text content
                apiCallsDiv.appendChild(h4);

                // Optional: Process each category's items
                // Here you could also append additional details about each category's items if needed

                // Loop through items in each category
                data[category].forEach(item => {
                    const cardDiv = document.createElement('div');
                    cardDiv.className = 'card';

                    // Assuming 'item.link' is the image URL, 'item.name' is the title,
                    // 'item.description' is the description, and 'item.days' is the badge content
                    cardDiv.innerHTML = `
                        <img src="${item.link}" alt="${item.name}" class="w-full h-32 sm:h-48 object-cover">
                        <div class="m-4">
                            <span class="font-bold">${item.name}</span>
                            <span class="block text-gray-500 text-sm">${item.description}</span>
                        </div>
                        <div class="badge">
                            <svg class="w-5 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
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