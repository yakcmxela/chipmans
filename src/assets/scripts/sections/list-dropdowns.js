import $ from 'jquery';
import * as sections from '@shopify/theme-sections';

let expandTrigger = $('.list-dropdowns__expand');

const expandItem = (evt) => {
	$(evt.currentTarget).parent().parent().toggleClass('active');
}

sections.register('list-dropdowns', {
  onLoad: () => {
  	 expandTrigger.on('click', (evt) => { expandItem(evt) });
  }
});