import $ from 'jquery';
import Variants from '@shopify/theme-variants';
import {formatMoney} from '@shopify/theme-currency';
import sections from '@shopify/theme-sections';

const primaryNav = document.getElementById('primary-nav');
const brandName = document.getElementById('brand-name-header');
const wheel = document.getElementById('wheel');
const logo = document.getElementById('header__logo');
const overlay = document.getElementById('site-overlay')
let isNavOpen = false;

const openNav = () => {
	if(!isNavOpen) {
		document.body.classList.add('nav-open');
		document.body.classList.remove('cart-open');
	} else {
		document.body.classList.remove('nav-open');
		document.body.classList.add('cart-open');
	}
	isNavOpen = !isNavOpen;
}

const scrolled = () => {
	let pos = window.scrollY;
	if(pos > 1) {
		document.body.classList.add('scrolled');
	} else {
		document.body.classList.remove('scrolled');
	}
}

wheel.addEventListener('click', () => {
	openNav();
});

logo.addEventListener('click', () => {
	openNav();
});

overlay.addEventListener('click', () => {
	openNav();
})

window.addEventListener('scroll', () => {
	scrolled();
});