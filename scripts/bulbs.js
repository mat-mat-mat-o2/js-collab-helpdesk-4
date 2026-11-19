export function initBulbs(){
    document.addEventListener('DOMContentLoaded', function () {

        const headings = [document.querySelector('h1'), document.querySelector('.tickets-section > h2')];

        const colors = ['#ffa81d','#59ce7e','#ffdb45','#398cff','#f247de'];

        function createLights(heading) 
        {

            if (!heading) return;
            let lights = heading.querySelector('.title-lights');

            if (!lights) 
            {
                lights = document.createElement('div');
                lights.className = 'title-lights';
                heading.appendChild(lights);
            }

            lights.innerHTML = '';

            const width = lights.clientWidth;
            const height = lights.clientHeight;
            const inset = 5;
            const left = inset;
            const right = width - inset;
            const top = inset;
            const bottom = height - inset;
            const horizontal = right - left;
            const vertical = bottom - top;
            const perimeter = 2 * (horizontal + vertical);
            const spacing = 55;
            const count = Math.floor(perimeter / spacing);
            const actualSpacing = perimeter / count;

            for (let i = 0; i < count; i++) 
            {
                const distance = i * actualSpacing;
                let x, y;

                if (distance < horizontal) 
                {
                    x = left + distance;
                    y = top;
                }

                else if (distance < horizontal + vertical) 
                {
                    x = right;
                    y = top + (distance - horizontal);
                }

                else if (distance < 2 * horizontal + vertical) 
                {
                    x = right - (distance - horizontal - vertical);
                    y = bottom;
                }

                else 
                {
                    x = left;
                    y = bottom - (distance - 2 * horizontal - vertical);
                }

                createBulb(x, y);
            }

            
        function createBulb(x, y) 
        {

        const bulb = document.createElement('span');
        bulb.className = 'title-bulb';
        bulb.style.left = x + 'px';
        bulb.style.top = (y + 2.5) + 'px';

        bulb.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
        bulb.style.setProperty('--speed', (1.5 + Math.random() * 2) + 's');
        bulb.style.setProperty('--delay', (Math.random() * 3) + 's');

        lights.appendChild(bulb);
        }

        }

        headings.forEach(createLights);

        window.addEventListener('resize', function () 
        {
            headings.forEach(createLights);
        });

    });
}