import slick from 'slick-carousel';
import $ from 'jquery';
import * as sections from '@shopify/theme-sections';

const Slides = () => {
	let splitSlides = $('.slides-text-icons__slides');
	splitSlides.slick({
		nextArrow: '<a class="arrow next fa fa-angle-double-right fa-2x"></a>',
		prevArrow: '<a class="arrow prev fa fa-angle-double-left fa-2x"></a>',
		dots: true
	});
}

sections.register('slides-text-icons', {
	onLoad: () => {
		Slides();
	},
});
