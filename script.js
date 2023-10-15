
    // Define the interval for image change in seconds
    const INTERVAL_IN_SECONDS = 10;

    // Array of images to be displayed, each object in the array represents an image with its file name and alt text
    const imagesArray = [
        { file: 'doughnuts.png', alt: 'A hand opening a box filled with assorted doughnuts, featuring toppings like caramel drizzle, rose petals, and popped popcorn.' },
        { file: 'rawtreat.png', alt: '' },
        { file: 'landing.jpg', alt: 'Two cups of coffee with intricate latte art designs on a sunlit wooden table.' },
        {file:'coffeepour.jpg', alt:"Close-up of a barista's hand pouring steamed milk into a black coffee cup, creating a swirl pattern of latte art."}
    ];

    // Function to add a new image to the banner and animate the transition
    const addScrollImage = ({ file, alt }) => {
        // Get the banner element by its ID
        const banner = document.getElementById("banner");
        // Convert the child nodes of the banner into an array
        const bannerChildrenArray = [...banner.childNodes];
        // Filter out the image elements from the array
        const imageElementsArray = bannerChildrenArray.filter((node) => node.tagName === 'IMG');
        // Destructure the array to get the old and next image elements
        const [oldImage, nextImage] = imageElementsArray;

        // If both old and next images exist, animate the transition
        if (oldImage && nextImage) {
            oldImage.className = 'slide-out';
            nextImage.className = 'slide-in';
            nextImage.style.left = '0';
        }

        // Create a new image element
        const newImage = document.createElement('img');
        // Set the source and alt text of the new image
        newImage.src = `./images/${file}`;
        newImage.alt = alt;
        // Position the new image to the left of the banner
        newImage.style.left = "-100%";
        // Add the new image to the banner
        banner.appendChild(newImage);
        // Remove the old image after the transition is complete
        setTimeout(() => oldImage && nextImage && oldImage.remove(), 4000);
    };

    // For each image in the array, set a timeout to add the image to the banner and set an interval to repeat the process
    imagesArray.forEach((image, index) => {
        setTimeout(() => {
            addScrollImage(image);
            setInterval(() => addScrollImage(image), INTERVAL_IN_SECONDS * 1000 * imagesArray.length);
        }, INTERVAL_IN_SECONDS * 1000 * index);
    });

    // // Function to open the text message app on the user's phone when a button is pressed
    // const openTextMessageApp = () => {
    //     // Create a link element
    //     const link = document.createElement('a');
    //     // Set the href attribute to "sms:" followed by the phone number to open the text message app with the phone number prefilled
    //     link.href = 'sms:0413849814';
    //     // Trigger a click event on the link element
    //     link.click();
    // };

    // // Get the button element by its ID
    // const button = document.getElementById('button-id');
    // // Add an event listener to the button to call the openTextMessageApp function when the button is pressed
    // button.addEventListener('click', openTextMessageApp);

const deleteInstagramWidget = () => {
    let widgetRemoved = false
    let hashtagRemoved = false
        const instagramFeedContainer = document.getElementById('eapps-instagram-feed-1');
        
        if(instagramFeedContainer) {
            const widgetButton = [...instagramFeedContainer.childNodes].find((element) => element.tagName === 'A');
            
            if (widgetButton) {
                
                instagramFeedContainer.removeChild(widgetButton);
                widgetRemoved =true
                // Disconnects the observer after successful deletion
            }
        }
        
    const [container, ..._] = document.getElementsByClassName('eapps-instagram-feed-title-container')
        if(container) {
            
            const hashTag = [...container.querySelectorAll('*')].find((element) => element.tagName === 'A');
            if (hashTag) {
                hashTag.remove()
                hashtagRemoved = true
                 // Disconnects the observer after successful deletion
            }
        }
    if (widgetRemoved && hashtagRemoved) {
            
        observer.disconnect();
        }
    }
    
    const observer = new MutationObserver((mutationsList) => {
        for(let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                deleteInstagramWidget();
            }
        }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    