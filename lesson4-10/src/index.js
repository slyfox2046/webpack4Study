import _ from 'lodash';
import $ from 'jquery';

const dom = $('<div>');
dom.html(_.join(['Dell','Lee'],'-'))
$('body').append(dom);
