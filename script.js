
const imageScroll = () => {
    const INTERVAL_IN_SECONDS = 5
    const imagesArray = [{ file: 'doughnuts.png', alt: 'A hand opening a box filled with assorted doughnuts, featuring toppings like caramel drizzle, rose petals, and popped popcorn.' }, { file: 'rawtreat.png', alt: '' }, { file: 'landing.jpg', alt: 'Two cups of coffee with intricate latte art designs on a sunlit wooden table.' }, {file:'coffeepour.png', alt:"Close-up of a barista's hand pouring steamed milk into a black coffee cup, creating a swirl pattern of latte art."}]

    const addScrollImage = ({file,alt}) => {
        // Get the banner element and add the new image to it
        const sel = document.getElementById("banner");
        const nextImage = sel.childNodes[1]

        const oldImage = sel.childNodes[0]

        if (oldImage && nextImage) {
            oldImage.setAttribute('class', 'slide-out');

            nextImage.style.left = '0'
            nextImage.setAttribute('class', 'slide-in');
        }

        // Create new img tag, set class to slide in, set src to image based on the argument
        const newImage = document.createElement('img');
        newImage.setAttribute('src', `./images/${file}`);
        newImage.setAttribute('alt', alt);
        newImage.style.left = "-100%"

        sel.appendChild(newImage);

        // Remove the old image after the transition is complete
        setTimeout(() => {
            if (oldImage && nextImage) {
                sel.removeChild(oldImage);
            }
        }, 4000); // Match the duration with the CSS transition
    };

    imagesArray.forEach((image, index) => {
        setTimeout(() => {
            addScrollImage(image);
            setInterval(() => {
                addScrollImage(image);
            }, (INTERVAL_IN_SECONDS * 1000) * imagesArray.length);
        }, (INTERVAL_IN_SECONDS * 1000) * index);
    });
}

