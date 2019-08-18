import '../styles/style';

const product = document.getElementsByClassName('product')[0];

product.addEventListener('mouseover', event => {
    let target = event.target;
    if (target.className === 'hover') {
        const div = target.parentNode;
        div.classList.add('hoverColor');
        target.onmouseout = () => {
            div.classList.remove('hoverColor');
        };
    }
});
