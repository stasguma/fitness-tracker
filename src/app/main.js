(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
!function(t,e,i){!function(){var s,a,n,h="2.2.3",o="datepicker",r=".datepicker-here",c=!1,d='<div class="datepicker"><i class="datepicker--pointer"></i><nav class="datepicker--nav"></nav><div class="datepicker--content"></div></div>',l={classes:"",inline:!1,language:"ru",startDate:new Date,firstDay:"",weekends:[6,0],dateFormat:"",altField:"",altFieldDateFormat:"@",toggleSelected:!0,keyboardNav:!0,position:"bottom left",offset:12,view:"days",minView:"days",showOtherMonths:!0,selectOtherMonths:!0,moveToOtherMonthsOnSelect:!0,showOtherYears:!0,selectOtherYears:!0,moveToOtherYearsOnSelect:!0,minDate:"",maxDate:"",disableNavWhenOutOfRange:!0,multipleDates:!1,multipleDatesSeparator:",",range:!1,todayButton:!1,clearButton:!1,showEvent:"focus",autoClose:!1,monthsField:"monthsShort",prevHtml:'<svg><path d="M 17,12 l -5,5 l 5,5"></path></svg>',nextHtml:'<svg><path d="M 14,12 l 5,5 l -5,5"></path></svg>',navTitles:{days:"MM, <i>yyyy</i>",months:"yyyy",years:"yyyy1 - yyyy2"},timepicker:!1,onlyTimepicker:!1,dateTimeSeparator:" ",timeFormat:"",minHours:0,maxHours:24,minMinutes:0,maxMinutes:59,hoursStep:1,minutesStep:1,onSelect:"",onShow:"",onHide:"",onChangeMonth:"",onChangeYear:"",onChangeDecade:"",onChangeView:"",onRenderCell:""},u={ctrlRight:[17,39],ctrlUp:[17,38],ctrlLeft:[17,37],ctrlDown:[17,40],shiftRight:[16,39],shiftUp:[16,38],shiftLeft:[16,37],shiftDown:[16,40],altUp:[18,38],altRight:[18,39],altLeft:[18,37],altDown:[18,40],ctrlShiftUp:[16,17,38]},m=function(t,a){this.el=t,this.$el=e(t),this.opts=e.extend(!0,{},l,a,this.$el.data()),s==i&&(s=e("body")),this.opts.startDate||(this.opts.startDate=new Date),"INPUT"==this.el.nodeName&&(this.elIsInput=!0),this.opts.altField&&(this.$altField="string"==typeof this.opts.altField?e(this.opts.altField):this.opts.altField),this.inited=!1,this.visible=!1,this.silent=!1,this.currentDate=this.opts.startDate,this.currentView=this.opts.view,this._createShortCuts(),this.selectedDates=[],this.views={},this.keys=[],this.minRange="",this.maxRange="",this._prevOnSelectValue="",this.init()};n=m,n.prototype={VERSION:h,viewIndexes:["days","months","years"],init:function(){c||this.opts.inline||!this.elIsInput||this._buildDatepickersContainer(),this._buildBaseHtml(),this._defineLocale(this.opts.language),this._syncWithMinMaxDates(),this.elIsInput&&(this.opts.inline||(this._setPositionClasses(this.opts.position),this._bindEvents()),this.opts.keyboardNav&&!this.opts.onlyTimepicker&&this._bindKeyboardEvents(),this.$datepicker.on("mousedown",this._onMouseDownDatepicker.bind(this)),this.$datepicker.on("mouseup",this._onMouseUpDatepicker.bind(this))),this.opts.classes&&this.$datepicker.addClass(this.opts.classes),this.opts.timepicker&&(this.timepicker=new e.fn.datepicker.Timepicker(this,this.opts),this._bindTimepickerEvents()),this.opts.onlyTimepicker&&this.$datepicker.addClass("-only-timepicker-"),this.views[this.currentView]=new e.fn.datepicker.Body(this,this.currentView,this.opts),this.views[this.currentView].show(),this.nav=new e.fn.datepicker.Navigation(this,this.opts),this.view=this.currentView,this.$el.on("clickCell.adp",this._onClickCell.bind(this)),this.$datepicker.on("mouseenter",".datepicker--cell",this._onMouseEnterCell.bind(this)),this.$datepicker.on("mouseleave",".datepicker--cell",this._onMouseLeaveCell.bind(this)),this.inited=!0},_createShortCuts:function(){this.minDate=this.opts.minDate?this.opts.minDate:new Date(-86399999136e5),this.maxDate=this.opts.maxDate?this.opts.maxDate:new Date(86399999136e5)},_bindEvents:function(){this.$el.on(this.opts.showEvent+".adp",this._onShowEvent.bind(this)),this.$el.on("mouseup.adp",this._onMouseUpEl.bind(this)),this.$el.on("blur.adp",this._onBlur.bind(this)),this.$el.on("keyup.adp",this._onKeyUpGeneral.bind(this)),e(t).on("resize.adp",this._onResize.bind(this)),e("body").on("mouseup.adp",this._onMouseUpBody.bind(this))},_bindKeyboardEvents:function(){this.$el.on("keydown.adp",this._onKeyDown.bind(this)),this.$el.on("keyup.adp",this._onKeyUp.bind(this)),this.$el.on("hotKey.adp",this._onHotKey.bind(this))},_bindTimepickerEvents:function(){this.$el.on("timeChange.adp",this._onTimeChange.bind(this))},isWeekend:function(t){return-1!==this.opts.weekends.indexOf(t)},_defineLocale:function(t){"string"==typeof t?(this.loc=e.fn.datepicker.language[t],this.loc||(console.warn("Can't find language \""+t+'" in Datepicker.language, will use "ru" instead'),this.loc=e.extend(!0,{},e.fn.datepicker.language.ru)),this.loc=e.extend(!0,{},e.fn.datepicker.language.ru,e.fn.datepicker.language[t])):this.loc=e.extend(!0,{},e.fn.datepicker.language.ru,t),this.opts.dateFormat&&(this.loc.dateFormat=this.opts.dateFormat),this.opts.timeFormat&&(this.loc.timeFormat=this.opts.timeFormat),""!==this.opts.firstDay&&(this.loc.firstDay=this.opts.firstDay),this.opts.timepicker&&(this.loc.dateFormat=[this.loc.dateFormat,this.loc.timeFormat].join(this.opts.dateTimeSeparator)),this.opts.onlyTimepicker&&(this.loc.dateFormat=this.loc.timeFormat);var i=this._getWordBoundaryRegExp;(this.loc.timeFormat.match(i("aa"))||this.loc.timeFormat.match(i("AA")))&&(this.ampm=!0)},_buildDatepickersContainer:function(){c=!0,s.append('<div class="datepickers-container" id="datepickers-container"></div>'),a=e("#datepickers-container")},_buildBaseHtml:function(){var t,i=e('<div class="datepicker-inline">');t="INPUT"==this.el.nodeName?this.opts.inline?i.insertAfter(this.$el):a:i.appendTo(this.$el),this.$datepicker=e(d).appendTo(t),this.$content=e(".datepicker--content",this.$datepicker),this.$nav=e(".datepicker--nav",this.$datepicker)},_triggerOnChange:function(){if(!this.selectedDates.length){if(""===this._prevOnSelectValue)return;return this._prevOnSelectValue="",this.opts.onSelect("","",this)}var t,e=this.selectedDates,i=n.getParsedDate(e[0]),s=this,a=new Date(i.year,i.month,i.date,i.hours,i.minutes);t=e.map(function(t){return s.formatDate(s.loc.dateFormat,t)}).join(this.opts.multipleDatesSeparator),(this.opts.multipleDates||this.opts.range)&&(a=e.map(function(t){var e=n.getParsedDate(t);return new Date(e.year,e.month,e.date,e.hours,e.minutes)})),this._prevOnSelectValue=t,this.opts.onSelect(t,a,this)},next:function(){var t=this.parsedDate,e=this.opts;switch(this.view){case"days":this.date=new Date(t.year,t.month+1,1),e.onChangeMonth&&e.onChangeMonth(this.parsedDate.month,this.parsedDate.year);break;case"months":this.date=new Date(t.year+1,t.month,1),e.onChangeYear&&e.onChangeYear(this.parsedDate.year);break;case"years":this.date=new Date(t.year+10,0,1),e.onChangeDecade&&e.onChangeDecade(this.curDecade)}},prev:function(){var t=this.parsedDate,e=this.opts;switch(this.view){case"days":this.date=new Date(t.year,t.month-1,1),e.onChangeMonth&&e.onChangeMonth(this.parsedDate.month,this.parsedDate.year);break;case"months":this.date=new Date(t.year-1,t.month,1),e.onChangeYear&&e.onChangeYear(this.parsedDate.year);break;case"years":this.date=new Date(t.year-10,0,1),e.onChangeDecade&&e.onChangeDecade(this.curDecade)}},formatDate:function(t,e){e=e||this.date;var i,s=t,a=this._getWordBoundaryRegExp,h=this.loc,o=n.getLeadingZeroNum,r=n.getDecade(e),c=n.getParsedDate(e),d=c.fullHours,l=c.hours,u=t.match(a("aa"))||t.match(a("AA")),m="am",p=this._replacer;switch(this.opts.timepicker&&this.timepicker&&u&&(i=this.timepicker._getValidHoursFromDate(e,u),d=o(i.hours),l=i.hours,m=i.dayPeriod),!0){case/@/.test(s):s=s.replace(/@/,e.getTime());case/aa/.test(s):s=p(s,a("aa"),m);case/AA/.test(s):s=p(s,a("AA"),m.toUpperCase());case/dd/.test(s):s=p(s,a("dd"),c.fullDate);case/d/.test(s):s=p(s,a("d"),c.date);case/DD/.test(s):s=p(s,a("DD"),h.days[c.day]);case/D/.test(s):s=p(s,a("D"),h.daysShort[c.day]);case/mm/.test(s):s=p(s,a("mm"),c.fullMonth);case/m/.test(s):s=p(s,a("m"),c.month+1);case/MM/.test(s):s=p(s,a("MM"),this.loc.months[c.month]);case/M/.test(s):s=p(s,a("M"),h.monthsShort[c.month]);case/ii/.test(s):s=p(s,a("ii"),c.fullMinutes);case/i/.test(s):s=p(s,a("i"),c.minutes);case/hh/.test(s):s=p(s,a("hh"),d);case/h/.test(s):s=p(s,a("h"),l);case/yyyy/.test(s):s=p(s,a("yyyy"),c.year);case/yyyy1/.test(s):s=p(s,a("yyyy1"),r[0]);case/yyyy2/.test(s):s=p(s,a("yyyy2"),r[1]);case/yy/.test(s):s=p(s,a("yy"),c.year.toString().slice(-2))}return s},_replacer:function(t,e,i){return t.replace(e,function(t,e,s,a){return e+i+a})},_getWordBoundaryRegExp:function(t){var e="\\s|\\.|-|/|\\\\|,|\\$|\\!|\\?|:|;";return new RegExp("(^|>|"+e+")("+t+")($|<|"+e+")","g")},selectDate:function(t){var e=this,i=e.opts,s=e.parsedDate,a=e.selectedDates,h=a.length,o="";if(Array.isArray(t))return void t.forEach(function(t){e.selectDate(t)});if(t instanceof Date){if(this.lastSelectedDate=t,this.timepicker&&this.timepicker._setTime(t),e._trigger("selectDate",t),this.timepicker&&(t.setHours(this.timepicker.hours),t.setMinutes(this.timepicker.minutes)),"days"==e.view&&t.getMonth()!=s.month&&i.moveToOtherMonthsOnSelect&&(o=new Date(t.getFullYear(),t.getMonth(),1)),"years"==e.view&&t.getFullYear()!=s.year&&i.moveToOtherYearsOnSelect&&(o=new Date(t.getFullYear(),0,1)),o&&(e.silent=!0,e.date=o,e.silent=!1,e.nav._render()),i.multipleDates&&!i.range){if(h===i.multipleDates)return;e._isSelected(t)||e.selectedDates.push(t)}else i.range?2==h?(e.selectedDates=[t],e.minRange=t,e.maxRange=""):1==h?(e.selectedDates.push(t),e.maxRange?e.minRange=t:e.maxRange=t,n.bigger(e.maxRange,e.minRange)&&(e.maxRange=e.minRange,e.minRange=t),e.selectedDates=[e.minRange,e.maxRange]):(e.selectedDates=[t],e.minRange=t):e.selectedDates=[t];e._setInputValue(),i.onSelect&&e._triggerOnChange(),i.autoClose&&!this.timepickerIsActive&&(i.multipleDates||i.range?i.range&&2==e.selectedDates.length&&e.hide():e.hide()),e.views[this.currentView]._render()}},removeDate:function(t){var e=this.selectedDates,i=this;if(t instanceof Date)return e.some(function(s,a){return n.isSame(s,t)?(e.splice(a,1),i.selectedDates.length?i.lastSelectedDate=i.selectedDates[i.selectedDates.length-1]:(i.minRange="",i.maxRange="",i.lastSelectedDate=""),i.views[i.currentView]._render(),i._setInputValue(),i.opts.onSelect&&i._triggerOnChange(),!0):void 0})},today:function(){this.silent=!0,this.view=this.opts.minView,this.silent=!1,this.date=new Date,this.opts.todayButton instanceof Date&&this.selectDate(this.opts.todayButton)},clear:function(){this.selectedDates=[],this.minRange="",this.maxRange="",this.views[this.currentView]._render(),this._setInputValue(),this.opts.onSelect&&this._triggerOnChange()},update:function(t,i){var s=arguments.length,a=this.lastSelectedDate;return 2==s?this.opts[t]=i:1==s&&"object"==typeof t&&(this.opts=e.extend(!0,this.opts,t)),this._createShortCuts(),this._syncWithMinMaxDates(),this._defineLocale(this.opts.language),this.nav._addButtonsIfNeed(),this.opts.onlyTimepicker||this.nav._render(),this.views[this.currentView]._render(),this.elIsInput&&!this.opts.inline&&(this._setPositionClasses(this.opts.position),this.visible&&this.setPosition(this.opts.position)),this.opts.classes&&this.$datepicker.addClass(this.opts.classes),this.opts.onlyTimepicker&&this.$datepicker.addClass("-only-timepicker-"),this.opts.timepicker&&(a&&this.timepicker._handleDate(a),this.timepicker._updateRanges(),this.timepicker._updateCurrentTime(),a&&(a.setHours(this.timepicker.hours),a.setMinutes(this.timepicker.minutes))),this._setInputValue(),this},_syncWithMinMaxDates:function(){var t=this.date.getTime();this.silent=!0,this.minTime>t&&(this.date=this.minDate),this.maxTime<t&&(this.date=this.maxDate),this.silent=!1},_isSelected:function(t,e){var i=!1;return this.selectedDates.some(function(s){return n.isSame(s,t,e)?(i=s,!0):void 0}),i},_setInputValue:function(){var t,e=this,i=e.opts,s=e.loc.dateFormat,a=i.altFieldDateFormat,n=e.selectedDates.map(function(t){return e.formatDate(s,t)});i.altField&&e.$altField.length&&(t=this.selectedDates.map(function(t){return e.formatDate(a,t)}),t=t.join(this.opts.multipleDatesSeparator),this.$altField.val(t)),n=n.join(this.opts.multipleDatesSeparator),this.$el.val(n)},_isInRange:function(t,e){var i=t.getTime(),s=n.getParsedDate(t),a=n.getParsedDate(this.minDate),h=n.getParsedDate(this.maxDate),o=new Date(s.year,s.month,a.date).getTime(),r=new Date(s.year,s.month,h.date).getTime(),c={day:i>=this.minTime&&i<=this.maxTime,month:o>=this.minTime&&r<=this.maxTime,year:s.year>=a.year&&s.year<=h.year};return e?c[e]:c.day},_getDimensions:function(t){var e=t.offset();return{width:t.outerWidth(),height:t.outerHeight(),left:e.left,top:e.top}},_getDateFromCell:function(t){var e=this.parsedDate,s=t.data("year")||e.year,a=t.data("month")==i?e.month:t.data("month"),n=t.data("date")||1;return new Date(s,a,n)},_setPositionClasses:function(t){t=t.split(" ");var e=t[0],i=t[1],s="datepicker -"+e+"-"+i+"- -from-"+e+"-";this.visible&&(s+=" active"),this.$datepicker.removeAttr("class").addClass(s)},setPosition:function(t){t=t||this.opts.position;var e,i,s=this._getDimensions(this.$el),a=this._getDimensions(this.$datepicker),n=t.split(" "),h=this.opts.offset,o=n[0],r=n[1];switch(o){case"top":e=s.top-a.height-h;break;case"right":i=s.left+s.width+h;break;case"bottom":e=s.top+s.height+h;break;case"left":i=s.left-a.width-h}switch(r){case"top":e=s.top;break;case"right":i=s.left+s.width-a.width;break;case"bottom":e=s.top+s.height-a.height;break;case"left":i=s.left;break;case"center":/left|right/.test(o)?e=s.top+s.height/2-a.height/2:i=s.left+s.width/2-a.width/2}this.$datepicker.css({left:i,top:e})},show:function(){var t=this.opts.onShow;this.setPosition(this.opts.position),this.$datepicker.addClass("active"),this.visible=!0,t&&this._bindVisionEvents(t)},hide:function(){var t=this.opts.onHide;this.$datepicker.removeClass("active").css({left:"-100000px"}),this.focused="",this.keys=[],this.inFocus=!1,this.visible=!1,this.$el.blur(),t&&this._bindVisionEvents(t)},down:function(t){this._changeView(t,"down")},up:function(t){this._changeView(t,"up")},_bindVisionEvents:function(t){this.$datepicker.off("transitionend.dp"),t(this,!1),this.$datepicker.one("transitionend.dp",t.bind(this,this,!0))},_changeView:function(t,e){t=t||this.focused||this.date;var i="up"==e?this.viewIndex+1:this.viewIndex-1;i>2&&(i=2),0>i&&(i=0),this.silent=!0,this.date=new Date(t.getFullYear(),t.getMonth(),1),this.silent=!1,this.view=this.viewIndexes[i]},_handleHotKey:function(t){var e,i,s,a=n.getParsedDate(this._getFocusedDate()),h=this.opts,o=!1,r=!1,c=!1,d=a.year,l=a.month,u=a.date;switch(t){case"ctrlRight":case"ctrlUp":l+=1,o=!0;break;case"ctrlLeft":case"ctrlDown":l-=1,o=!0;break;case"shiftRight":case"shiftUp":r=!0,d+=1;break;case"shiftLeft":case"shiftDown":r=!0,d-=1;break;case"altRight":case"altUp":c=!0,d+=10;break;case"altLeft":case"altDown":c=!0,d-=10;break;case"ctrlShiftUp":this.up()}s=n.getDaysCount(new Date(d,l)),i=new Date(d,l,u),u>s&&(u=s),i.getTime()<this.minTime?i=this.minDate:i.getTime()>this.maxTime&&(i=this.maxDate),this.focused=i,e=n.getParsedDate(i),o&&h.onChangeMonth&&h.onChangeMonth(e.month,e.year),r&&h.onChangeYear&&h.onChangeYear(e.year),c&&h.onChangeDecade&&h.onChangeDecade(this.curDecade)},_registerKey:function(t){var e=this.keys.some(function(e){return e==t});e||this.keys.push(t)},_unRegisterKey:function(t){var e=this.keys.indexOf(t);this.keys.splice(e,1)},_isHotKeyPressed:function(){var t,e=!1,i=this,s=this.keys.sort();for(var a in u)t=u[a],s.length==t.length&&t.every(function(t,e){return t==s[e]})&&(i._trigger("hotKey",a),e=!0);return e},_trigger:function(t,e){this.$el.trigger(t,e)},_focusNextCell:function(t,e){e=e||this.cellType;var i=n.getParsedDate(this._getFocusedDate()),s=i.year,a=i.month,h=i.date;if(!this._isHotKeyPressed()){switch(t){case 37:"day"==e?h-=1:"","month"==e?a-=1:"","year"==e?s-=1:"";break;case 38:"day"==e?h-=7:"","month"==e?a-=3:"","year"==e?s-=4:"";break;case 39:"day"==e?h+=1:"","month"==e?a+=1:"","year"==e?s+=1:"";break;case 40:"day"==e?h+=7:"","month"==e?a+=3:"","year"==e?s+=4:""}var o=new Date(s,a,h);o.getTime()<this.minTime?o=this.minDate:o.getTime()>this.maxTime&&(o=this.maxDate),this.focused=o}},_getFocusedDate:function(){var t=this.focused||this.selectedDates[this.selectedDates.length-1],e=this.parsedDate;if(!t)switch(this.view){case"days":t=new Date(e.year,e.month,(new Date).getDate());break;case"months":t=new Date(e.year,e.month,1);break;case"years":t=new Date(e.year,0,1)}return t},_getCell:function(t,i){i=i||this.cellType;var s,a=n.getParsedDate(t),h='.datepicker--cell[data-year="'+a.year+'"]';switch(i){case"month":h='[data-month="'+a.month+'"]';break;case"day":h+='[data-month="'+a.month+'"][data-date="'+a.date+'"]'}return s=this.views[this.currentView].$el.find(h),s.length?s:e("")},destroy:function(){var t=this;t.$el.off(".adp").data("datepicker",""),t.selectedDates=[],t.focused="",t.views={},t.keys=[],t.minRange="",t.maxRange="",t.opts.inline||!t.elIsInput?t.$datepicker.closest(".datepicker-inline").remove():t.$datepicker.remove()},_handleAlreadySelectedDates:function(t,e){this.opts.range?this.opts.toggleSelected?this.removeDate(e):2!=this.selectedDates.length&&this._trigger("clickCell",e):this.opts.toggleSelected&&this.removeDate(e),this.opts.toggleSelected||(this.lastSelectedDate=t,this.opts.timepicker&&(this.timepicker._setTime(t),this.timepicker.update()))},_onShowEvent:function(t){this.visible||this.show()},_onBlur:function(){!this.inFocus&&this.visible&&this.hide()},_onMouseDownDatepicker:function(t){this.inFocus=!0},_onMouseUpDatepicker:function(t){this.inFocus=!1,t.originalEvent.inFocus=!0,t.originalEvent.timepickerFocus||this.$el.focus()},_onKeyUpGeneral:function(t){var e=this.$el.val();e||this.clear()},_onResize:function(){this.visible&&this.setPosition()},_onMouseUpBody:function(t){t.originalEvent.inFocus||this.visible&&!this.inFocus&&this.hide()},_onMouseUpEl:function(t){t.originalEvent.inFocus=!0,setTimeout(this._onKeyUpGeneral.bind(this),4)},_onKeyDown:function(t){var e=t.which;if(this._registerKey(e),e>=37&&40>=e&&(t.preventDefault(),this._focusNextCell(e)),13==e&&this.focused){if(this._getCell(this.focused).hasClass("-disabled-"))return;if(this.view!=this.opts.minView)this.down();else{var i=this._isSelected(this.focused,this.cellType);if(!i)return this.timepicker&&(this.focused.setHours(this.timepicker.hours),this.focused.setMinutes(this.timepicker.minutes)),void this.selectDate(this.focused);this._handleAlreadySelectedDates(i,this.focused)}}27==e&&this.hide()},_onKeyUp:function(t){var e=t.which;this._unRegisterKey(e)},_onHotKey:function(t,e){this._handleHotKey(e)},_onMouseEnterCell:function(t){var i=e(t.target).closest(".datepicker--cell"),s=this._getDateFromCell(i);this.silent=!0,this.focused&&(this.focused=""),i.addClass("-focus-"),this.focused=s,this.silent=!1,this.opts.range&&1==this.selectedDates.length&&(this.minRange=this.selectedDates[0],this.maxRange="",n.less(this.minRange,this.focused)&&(this.maxRange=this.minRange,this.minRange=""),this.views[this.currentView]._update())},_onMouseLeaveCell:function(t){var i=e(t.target).closest(".datepicker--cell");i.removeClass("-focus-"),this.silent=!0,this.focused="",this.silent=!1},_onTimeChange:function(t,e,i){var s=new Date,a=this.selectedDates,n=!1;a.length&&(n=!0,s=this.lastSelectedDate),s.setHours(e),s.setMinutes(i),n||this._getCell(s).hasClass("-disabled-")?(this._setInputValue(),this.opts.onSelect&&this._triggerOnChange()):this.selectDate(s)},_onClickCell:function(t,e){this.timepicker&&(e.setHours(this.timepicker.hours),e.setMinutes(this.timepicker.minutes)),this.selectDate(e)},set focused(t){if(!t&&this.focused){var e=this._getCell(this.focused);e.length&&e.removeClass("-focus-")}this._focused=t,this.opts.range&&1==this.selectedDates.length&&(this.minRange=this.selectedDates[0],this.maxRange="",n.less(this.minRange,this._focused)&&(this.maxRange=this.minRange,this.minRange="")),this.silent||(this.date=t)},get focused(){return this._focused},get parsedDate(){return n.getParsedDate(this.date)},set date(t){return t instanceof Date?(this.currentDate=t,this.inited&&!this.silent&&(this.views[this.view]._render(),this.nav._render(),this.visible&&this.elIsInput&&this.setPosition()),t):void 0},get date(){return this.currentDate},set view(t){return this.viewIndex=this.viewIndexes.indexOf(t),this.viewIndex<0?void 0:(this.prevView=this.currentView,this.currentView=t,this.inited&&(this.views[t]?this.views[t]._render():this.views[t]=new e.fn.datepicker.Body(this,t,this.opts),this.views[this.prevView].hide(),this.views[t].show(),this.nav._render(),this.opts.onChangeView&&this.opts.onChangeView(t),this.elIsInput&&this.visible&&this.setPosition()),t)},get view(){return this.currentView},get cellType(){return this.view.substring(0,this.view.length-1)},get minTime(){var t=n.getParsedDate(this.minDate);return new Date(t.year,t.month,t.date).getTime()},get maxTime(){var t=n.getParsedDate(this.maxDate);return new Date(t.year,t.month,t.date).getTime()},get curDecade(){return n.getDecade(this.date)}},n.getDaysCount=function(t){return new Date(t.getFullYear(),t.getMonth()+1,0).getDate()},n.getParsedDate=function(t){return{year:t.getFullYear(),month:t.getMonth(),fullMonth:t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1,date:t.getDate(),fullDate:t.getDate()<10?"0"+t.getDate():t.getDate(),day:t.getDay(),hours:t.getHours(),fullHours:t.getHours()<10?"0"+t.getHours():t.getHours(),minutes:t.getMinutes(),fullMinutes:t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes()}},n.getDecade=function(t){var e=10*Math.floor(t.getFullYear()/10);return[e,e+9]},n.template=function(t,e){return t.replace(/#\{([\w]+)\}/g,function(t,i){return e[i]||0===e[i]?e[i]:void 0})},n.isSame=function(t,e,i){if(!t||!e)return!1;var s=n.getParsedDate(t),a=n.getParsedDate(e),h=i?i:"day",o={day:s.date==a.date&&s.month==a.month&&s.year==a.year,month:s.month==a.month&&s.year==a.year,year:s.year==a.year};return o[h]},n.less=function(t,e,i){return t&&e?e.getTime()<t.getTime():!1},n.bigger=function(t,e,i){return t&&e?e.getTime()>t.getTime():!1},n.getLeadingZeroNum=function(t){return parseInt(t)<10?"0"+t:t},n.resetTime=function(t){return"object"==typeof t?(t=n.getParsedDate(t),new Date(t.year,t.month,t.date)):void 0},e.fn.datepicker=function(t){return this.each(function(){if(e.data(this,o)){var i=e.data(this,o);i.opts=e.extend(!0,i.opts,t),i.update()}else e.data(this,o,new m(this,t))})},e.fn.datepicker.Constructor=m,e.fn.datepicker.language={ru:{days:["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"],daysShort:["Вос","Пон","Вто","Сре","Чет","Пят","Суб"],daysMin:["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],months:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],monthsShort:["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"],today:"Сегодня",clear:"Очистить",dateFormat:"dd.mm.yyyy",timeFormat:"hh:ii",firstDay:1}},e(function(){e(r).datepicker()})}(),function(){var t={days:'<div class="datepicker--days datepicker--body"><div class="datepicker--days-names"></div><div class="datepicker--cells datepicker--cells-days"></div></div>',months:'<div class="datepicker--months datepicker--body"><div class="datepicker--cells datepicker--cells-months"></div></div>',years:'<div class="datepicker--years datepicker--body"><div class="datepicker--cells datepicker--cells-years"></div></div>'},s=e.fn.datepicker,a=s.Constructor;s.Body=function(t,i,s){this.d=t,this.type=i,this.opts=s,this.$el=e(""),this.opts.onlyTimepicker||this.init()},s.Body.prototype={init:function(){this._buildBaseHtml(),this._render(),this._bindEvents()},_bindEvents:function(){this.$el.on("click",".datepicker--cell",e.proxy(this._onClickCell,this))},_buildBaseHtml:function(){this.$el=e(t[this.type]).appendTo(this.d.$content),this.$names=e(".datepicker--days-names",this.$el),this.$cells=e(".datepicker--cells",this.$el)},_getDayNamesHtml:function(t,e,s,a){return e=e!=i?e:t,s=s?s:"",a=a!=i?a:0,a>7?s:7==e?this._getDayNamesHtml(t,0,s,++a):(s+='<div class="datepicker--day-name'+(this.d.isWeekend(e)?" -weekend-":"")+'">'+this.d.loc.daysMin[e]+"</div>",this._getDayNamesHtml(t,++e,s,++a))},_getCellContents:function(t,e){var i="datepicker--cell datepicker--cell-"+e,s=new Date,n=this.d,h=a.resetTime(n.minRange),o=a.resetTime(n.maxRange),r=n.opts,c=a.getParsedDate(t),d={},l=c.date;switch(e){case"day":n.isWeekend(c.day)&&(i+=" -weekend-"),c.month!=this.d.parsedDate.month&&(i+=" -other-month-",r.selectOtherMonths||(i+=" -disabled-"),r.showOtherMonths||(l=""));break;case"month":l=n.loc[n.opts.monthsField][c.month];break;case"year":var u=n.curDecade;l=c.year,(c.year<u[0]||c.year>u[1])&&(i+=" -other-decade-",r.selectOtherYears||(i+=" -disabled-"),r.showOtherYears||(l=""))}return r.onRenderCell&&(d=r.onRenderCell(t,e)||{},l=d.html?d.html:l,i+=d.classes?" "+d.classes:""),r.range&&(a.isSame(h,t,e)&&(i+=" -range-from-"),a.isSame(o,t,e)&&(i+=" -range-to-"),1==n.selectedDates.length&&n.focused?((a.bigger(h,t)&&a.less(n.focused,t)||a.less(o,t)&&a.bigger(n.focused,t))&&(i+=" -in-range-"),a.less(o,t)&&a.isSame(n.focused,t)&&(i+=" -range-from-"),a.bigger(h,t)&&a.isSame(n.focused,t)&&(i+=" -range-to-")):2==n.selectedDates.length&&a.bigger(h,t)&&a.less(o,t)&&(i+=" -in-range-")),a.isSame(s,t,e)&&(i+=" -current-"),n.focused&&a.isSame(t,n.focused,e)&&(i+=" -focus-"),n._isSelected(t,e)&&(i+=" -selected-"),(!n._isInRange(t,e)||d.disabled)&&(i+=" -disabled-"),{html:l,classes:i}},_getDaysHtml:function(t){var e=a.getDaysCount(t),i=new Date(t.getFullYear(),t.getMonth(),1).getDay(),s=new Date(t.getFullYear(),t.getMonth(),e).getDay(),n=i-this.d.loc.firstDay,h=6-s+this.d.loc.firstDay;n=0>n?n+7:n,h=h>6?h-7:h;for(var o,r,c=-n+1,d="",l=c,u=e+h;u>=l;l++)r=t.getFullYear(),o=t.getMonth(),d+=this._getDayHtml(new Date(r,o,l));return d},_getDayHtml:function(t){var e=this._getCellContents(t,"day");return'<div class="'+e.classes+'" data-date="'+t.getDate()+'" data-month="'+t.getMonth()+'" data-year="'+t.getFullYear()+'">'+e.html+"</div>"},_getMonthsHtml:function(t){for(var e="",i=a.getParsedDate(t),s=0;12>s;)e+=this._getMonthHtml(new Date(i.year,s)),s++;return e},_getMonthHtml:function(t){var e=this._getCellContents(t,"month");return'<div class="'+e.classes+'" data-month="'+t.getMonth()+'">'+e.html+"</div>"},_getYearsHtml:function(t){var e=(a.getParsedDate(t),a.getDecade(t)),i=e[0]-1,s="",n=i;for(n;n<=e[1]+1;n++)s+=this._getYearHtml(new Date(n,0));return s},_getYearHtml:function(t){var e=this._getCellContents(t,"year");return'<div class="'+e.classes+'" data-year="'+t.getFullYear()+'">'+e.html+"</div>"},_renderTypes:{days:function(){var t=this._getDayNamesHtml(this.d.loc.firstDay),e=this._getDaysHtml(this.d.currentDate);this.$cells.html(e),this.$names.html(t)},months:function(){var t=this._getMonthsHtml(this.d.currentDate);this.$cells.html(t)},years:function(){var t=this._getYearsHtml(this.d.currentDate);this.$cells.html(t)}},_render:function(){this.opts.onlyTimepicker||this._renderTypes[this.type].bind(this)()},_update:function(){var t,i,s,a=e(".datepicker--cell",this.$cells),n=this;a.each(function(a,h){i=e(this),s=n.d._getDateFromCell(e(this)),t=n._getCellContents(s,n.d.cellType),i.attr("class",t.classes)})},show:function(){this.opts.onlyTimepicker||(this.$el.addClass("active"),this.acitve=!0)},hide:function(){this.$el.removeClass("active"),this.active=!1},_handleClick:function(t){var e=t.data("date")||1,i=t.data("month")||0,s=t.data("year")||this.d.parsedDate.year,a=this.d;if(a.view!=this.opts.minView)return void a.down(new Date(s,i,e));var n=new Date(s,i,e),h=this.d._isSelected(n,this.d.cellType);return h?void a._handleAlreadySelectedDates.bind(a,h,n)():void a._trigger("clickCell",n)},_onClickCell:function(t){var i=e(t.target).closest(".datepicker--cell");i.hasClass("-disabled-")||this._handleClick.bind(this)(i)}}}(),function(){var t='<div class="datepicker--nav-action" data-action="prev">#{prevHtml}</div><div class="datepicker--nav-title">#{title}</div><div class="datepicker--nav-action" data-action="next">#{nextHtml}</div>',i='<div class="datepicker--buttons"></div>',s='<span class="datepicker--button" data-action="#{action}">#{label}</span>',a=e.fn.datepicker,n=a.Constructor;a.Navigation=function(t,e){this.d=t,this.opts=e,this.$buttonsContainer="",this.init()},a.Navigation.prototype={init:function(){this._buildBaseHtml(),this._bindEvents()},_bindEvents:function(){this.d.$nav.on("click",".datepicker--nav-action",e.proxy(this._onClickNavButton,this)),this.d.$nav.on("click",".datepicker--nav-title",e.proxy(this._onClickNavTitle,this)),this.d.$datepicker.on("click",".datepicker--button",e.proxy(this._onClickNavButton,this))},_buildBaseHtml:function(){this.opts.onlyTimepicker||this._render(),this._addButtonsIfNeed()},_addButtonsIfNeed:function(){this.opts.todayButton&&this._addButton("today"),this.opts.clearButton&&this._addButton("clear")},_render:function(){var i=this._getTitle(this.d.currentDate),s=n.template(t,e.extend({title:i},this.opts));this.d.$nav.html(s),"years"==this.d.view&&e(".datepicker--nav-title",this.d.$nav).addClass("-disabled-"),this.setNavStatus()},_getTitle:function(t){return this.d.formatDate(this.opts.navTitles[this.d.view],t)},_addButton:function(t){this.$buttonsContainer.length||this._addButtonsContainer();var i={action:t,label:this.d.loc[t]},a=n.template(s,i);e("[data-action="+t+"]",this.$buttonsContainer).length||this.$buttonsContainer.append(a)},_addButtonsContainer:function(){this.d.$datepicker.append(i),this.$buttonsContainer=e(".datepicker--buttons",this.d.$datepicker)},setNavStatus:function(){if((this.opts.minDate||this.opts.maxDate)&&this.opts.disableNavWhenOutOfRange){var t=this.d.parsedDate,e=t.month,i=t.year,s=t.date;switch(this.d.view){case"days":this.d._isInRange(new Date(i,e-1,1),"month")||this._disableNav("prev"),this.d._isInRange(new Date(i,e+1,1),"month")||this._disableNav("next");break;case"months":this.d._isInRange(new Date(i-1,e,s),"year")||this._disableNav("prev"),this.d._isInRange(new Date(i+1,e,s),"year")||this._disableNav("next");break;case"years":var a=n.getDecade(this.d.date);this.d._isInRange(new Date(a[0]-1,0,1),"year")||this._disableNav("prev"),this.d._isInRange(new Date(a[1]+1,0,1),"year")||this._disableNav("next")}}},_disableNav:function(t){e('[data-action="'+t+'"]',this.d.$nav).addClass("-disabled-")},_activateNav:function(t){e('[data-action="'+t+'"]',this.d.$nav).removeClass("-disabled-")},_onClickNavButton:function(t){var i=e(t.target).closest("[data-action]"),s=i.data("action");this.d[s]()},_onClickNavTitle:function(t){return e(t.target).hasClass("-disabled-")?void 0:"days"==this.d.view?this.d.view="months":void(this.d.view="years")}}}(),function(){var t='<div class="datepicker--time"><div class="datepicker--time-current">   <span class="datepicker--time-current-hours">#{hourVisible}</span>   <span class="datepicker--time-current-colon">:</span>   <span class="datepicker--time-current-minutes">#{minValue}</span></div><div class="datepicker--time-sliders">   <div class="datepicker--time-row">      <input type="range" name="hours" value="#{hourValue}" min="#{hourMin}" max="#{hourMax}" step="#{hourStep}"/>   </div>   <div class="datepicker--time-row">      <input type="range" name="minutes" value="#{minValue}" min="#{minMin}" max="#{minMax}" step="#{minStep}"/>   </div></div></div>',i=e.fn.datepicker,s=i.Constructor;i.Timepicker=function(t,e){this.d=t,this.opts=e,this.init()},i.Timepicker.prototype={init:function(){var t="input";this._setTime(this.d.date),this._buildHTML(),navigator.userAgent.match(/trident/gi)&&(t="change"),this.d.$el.on("selectDate",this._onSelectDate.bind(this)),this.$ranges.on(t,this._onChangeRange.bind(this)),this.$ranges.on("mouseup",this._onMouseUpRange.bind(this)),this.$ranges.on("mousemove focus ",this._onMouseEnterRange.bind(this)),this.$ranges.on("mouseout blur",this._onMouseOutRange.bind(this))},_setTime:function(t){var e=s.getParsedDate(t);this._handleDate(t),this.hours=e.hours<this.minHours?this.minHours:e.hours,this.minutes=e.minutes<this.minMinutes?this.minMinutes:e.minutes},_setMinTimeFromDate:function(t){this.minHours=t.getHours(),this.minMinutes=t.getMinutes(),this.d.lastSelectedDate&&this.d.lastSelectedDate.getHours()>t.getHours()&&(this.minMinutes=this.opts.minMinutes)},_setMaxTimeFromDate:function(t){
this.maxHours=t.getHours(),this.maxMinutes=t.getMinutes(),this.d.lastSelectedDate&&this.d.lastSelectedDate.getHours()<t.getHours()&&(this.maxMinutes=this.opts.maxMinutes)},_setDefaultMinMaxTime:function(){var t=23,e=59,i=this.opts;this.minHours=i.minHours<0||i.minHours>t?0:i.minHours,this.minMinutes=i.minMinutes<0||i.minMinutes>e?0:i.minMinutes,this.maxHours=i.maxHours<0||i.maxHours>t?t:i.maxHours,this.maxMinutes=i.maxMinutes<0||i.maxMinutes>e?e:i.maxMinutes},_validateHoursMinutes:function(t){this.hours<this.minHours?this.hours=this.minHours:this.hours>this.maxHours&&(this.hours=this.maxHours),this.minutes<this.minMinutes?this.minutes=this.minMinutes:this.minutes>this.maxMinutes&&(this.minutes=this.maxMinutes)},_buildHTML:function(){var i=s.getLeadingZeroNum,a={hourMin:this.minHours,hourMax:i(this.maxHours),hourStep:this.opts.hoursStep,hourValue:this.hours,hourVisible:i(this.displayHours),minMin:this.minMinutes,minMax:i(this.maxMinutes),minStep:this.opts.minutesStep,minValue:i(this.minutes)},n=s.template(t,a);this.$timepicker=e(n).appendTo(this.d.$datepicker),this.$ranges=e('[type="range"]',this.$timepicker),this.$hours=e('[name="hours"]',this.$timepicker),this.$minutes=e('[name="minutes"]',this.$timepicker),this.$hoursText=e(".datepicker--time-current-hours",this.$timepicker),this.$minutesText=e(".datepicker--time-current-minutes",this.$timepicker),this.d.ampm&&(this.$ampm=e('<span class="datepicker--time-current-ampm">').appendTo(e(".datepicker--time-current",this.$timepicker)).html(this.dayPeriod),this.$timepicker.addClass("-am-pm-"))},_updateCurrentTime:function(){var t=s.getLeadingZeroNum(this.displayHours),e=s.getLeadingZeroNum(this.minutes);this.$hoursText.html(t),this.$minutesText.html(e),this.d.ampm&&this.$ampm.html(this.dayPeriod)},_updateRanges:function(){this.$hours.attr({min:this.minHours,max:this.maxHours}).val(this.hours),this.$minutes.attr({min:this.minMinutes,max:this.maxMinutes}).val(this.minutes)},_handleDate:function(t){this._setDefaultMinMaxTime(),t&&(s.isSame(t,this.d.opts.minDate)?this._setMinTimeFromDate(this.d.opts.minDate):s.isSame(t,this.d.opts.maxDate)&&this._setMaxTimeFromDate(this.d.opts.maxDate)),this._validateHoursMinutes(t)},update:function(){this._updateRanges(),this._updateCurrentTime()},_getValidHoursFromDate:function(t,e){var i=t,a=t;t instanceof Date&&(i=s.getParsedDate(t),a=i.hours);var n=e||this.d.ampm,h="am";if(n)switch(!0){case 0==a:a=12;break;case 12==a:h="pm";break;case a>11:a-=12,h="pm"}return{hours:a,dayPeriod:h}},set hours(t){this._hours=t;var e=this._getValidHoursFromDate(t);this.displayHours=e.hours,this.dayPeriod=e.dayPeriod},get hours(){return this._hours},_onChangeRange:function(t){var i=e(t.target),s=i.attr("name");this.d.timepickerIsActive=!0,this[s]=i.val(),this._updateCurrentTime(),this.d._trigger("timeChange",[this.hours,this.minutes]),this._handleDate(this.d.lastSelectedDate),this.update()},_onSelectDate:function(t,e){this._handleDate(e),this.update()},_onMouseEnterRange:function(t){var i=e(t.target).attr("name");e(".datepicker--time-current-"+i,this.$timepicker).addClass("-focus-")},_onMouseOutRange:function(t){var i=e(t.target).attr("name");this.d.inFocus||e(".datepicker--time-current-"+i,this.$timepicker).removeClass("-focus-")},_onMouseUpRange:function(t){this.d.timepickerIsActive=!1}}}()}(window,jQuery);
},{}],2:[function(require,module,exports){
/*!
 * clipboard.js v2.0.1
 * https://zenorocha.github.io/clipboard.js
 * 
 * Licensed MIT © Zeno Rocha
 */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.ClipboardJS=e():t.ClipboardJS=e()}(this,function(){return function(t){function e(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=3)}([function(t,e,n){var o,r,i;!function(a,c){r=[t,n(7)],o=c,void 0!==(i="function"==typeof o?o.apply(e,r):o)&&(t.exports=i)}(0,function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(t){return t&&t.__esModule?t:{default:t}}(e),r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),a=function(){function t(e){n(this,t),this.resolveOptions(e),this.initSelection()}return i(t,[{key:"resolveOptions",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action=t.action,this.container=t.container,this.emitter=t.emitter,this.target=t.target,this.text=t.text,this.trigger=t.trigger,this.selectedText=""}},{key:"initSelection",value:function(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:"selectFake",value:function(){var t=this,e="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return t.removeFake()},this.fakeHandler=this.container.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[e?"right":"left"]="-9999px";var n=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=n+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,this.container.appendChild(this.fakeElem),this.selectedText=(0,o.default)(this.fakeElem),this.copyText()}},{key:"removeFake",value:function(){this.fakeHandler&&(this.container.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(this.container.removeChild(this.fakeElem),this.fakeElem=null)}},{key:"selectTarget",value:function(){this.selectedText=(0,o.default)(this.target),this.copyText()}},{key:"copyText",value:function(){var t=void 0;try{t=document.execCommand(this.action)}catch(e){t=!1}this.handleResult(t)}},{key:"handleResult",value:function(t){this.emitter.emit(t?"success":"error",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:"clearSelection",value:function(){this.trigger&&this.trigger.focus(),window.getSelection().removeAllRanges()}},{key:"destroy",value:function(){this.removeFake()}},{key:"action",set:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"copy";if(this._action=t,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function(){return this._action}},{key:"target",set:function(t){if(void 0!==t){if(!t||"object"!==(void 0===t?"undefined":r(t))||1!==t.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&t.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(t.hasAttribute("readonly")||t.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=t}},get:function(){return this._target}}]),t}();t.exports=a})},function(t,e,n){function o(t,e,n){if(!t&&!e&&!n)throw new Error("Missing required arguments");if(!c.string(e))throw new TypeError("Second argument must be a String");if(!c.fn(n))throw new TypeError("Third argument must be a Function");if(c.node(t))return r(t,e,n);if(c.nodeList(t))return i(t,e,n);if(c.string(t))return a(t,e,n);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function r(t,e,n){return t.addEventListener(e,n),{destroy:function(){t.removeEventListener(e,n)}}}function i(t,e,n){return Array.prototype.forEach.call(t,function(t){t.addEventListener(e,n)}),{destroy:function(){Array.prototype.forEach.call(t,function(t){t.removeEventListener(e,n)})}}}function a(t,e,n){return u(document.body,t,e,n)}var c=n(6),u=n(5);t.exports=o},function(t,e){function n(){}n.prototype={on:function(t,e,n){var o=this.e||(this.e={});return(o[t]||(o[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){function o(){r.off(t,o),e.apply(n,arguments)}var r=this;return o._=e,this.on(t,o,n)},emit:function(t){var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),o=0,r=n.length;for(o;o<r;o++)n[o].fn.apply(n[o].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),o=n[t],r=[];if(o&&e)for(var i=0,a=o.length;i<a;i++)o[i].fn!==e&&o[i].fn._!==e&&r.push(o[i]);return r.length?n[t]=r:delete n[t],this}},t.exports=n},function(t,e,n){var o,r,i;!function(a,c){r=[t,n(0),n(2),n(1)],o=c,void 0!==(i="function"==typeof o?o.apply(e,r):o)&&(t.exports=i)}(0,function(t,e,n,o){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function c(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function u(t,e){var n="data-clipboard-"+t;if(e.hasAttribute(n))return e.getAttribute(n)}var l=r(e),s=r(n),f=r(o),d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},h=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),p=function(t){function e(t,n){i(this,e);var o=a(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return o.resolveOptions(n),o.listenClick(t),o}return c(e,t),h(e,[{key:"resolveOptions",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action="function"==typeof t.action?t.action:this.defaultAction,this.target="function"==typeof t.target?t.target:this.defaultTarget,this.text="function"==typeof t.text?t.text:this.defaultText,this.container="object"===d(t.container)?t.container:document.body}},{key:"listenClick",value:function(t){var e=this;this.listener=(0,f.default)(t,"click",function(t){return e.onClick(t)})}},{key:"onClick",value:function(t){var e=t.delegateTarget||t.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new l.default({action:this.action(e),target:this.target(e),text:this.text(e),container:this.container,trigger:e,emitter:this})}},{key:"defaultAction",value:function(t){return u("action",t)}},{key:"defaultTarget",value:function(t){var e=u("target",t);if(e)return document.querySelector(e)}},{key:"defaultText",value:function(t){return u("text",t)}},{key:"destroy",value:function(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)}}],[{key:"isSupported",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:["copy","cut"],e="string"==typeof t?[t]:t,n=!!document.queryCommandSupported;return e.forEach(function(t){n=n&&!!document.queryCommandSupported(t)}),n}}]),e}(s.default);t.exports=p})},function(t,e){function n(t,e){for(;t&&t.nodeType!==o;){if("function"==typeof t.matches&&t.matches(e))return t;t=t.parentNode}}var o=9;if("undefined"!=typeof Element&&!Element.prototype.matches){var r=Element.prototype;r.matches=r.matchesSelector||r.mozMatchesSelector||r.msMatchesSelector||r.oMatchesSelector||r.webkitMatchesSelector}t.exports=n},function(t,e,n){function o(t,e,n,o,r){var a=i.apply(this,arguments);return t.addEventListener(n,a,r),{destroy:function(){t.removeEventListener(n,a,r)}}}function r(t,e,n,r,i){return"function"==typeof t.addEventListener?o.apply(null,arguments):"function"==typeof n?o.bind(null,document).apply(null,arguments):("string"==typeof t&&(t=document.querySelectorAll(t)),Array.prototype.map.call(t,function(t){return o(t,e,n,r,i)}))}function i(t,e,n,o){return function(n){n.delegateTarget=a(n.target,e),n.delegateTarget&&o.call(t,n)}}var a=n(4);t.exports=r},function(t,e){e.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},e.nodeList=function(t){var n=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===n||"[object HTMLCollection]"===n)&&"length"in t&&(0===t.length||e.node(t[0]))},e.string=function(t){return"string"==typeof t||t instanceof String},e.fn=function(t){return"[object Function]"===Object.prototype.toString.call(t)}},function(t,e){function n(t){var e;if("SELECT"===t.nodeName)t.focus(),e=t.value;else if("INPUT"===t.nodeName||"TEXTAREA"===t.nodeName){var n=t.hasAttribute("readonly");n||t.setAttribute("readonly",""),t.select(),t.setSelectionRange(0,t.value.length),n||t.removeAttribute("readonly"),e=t.value}else{t.hasAttribute("contenteditable")&&t.focus();var o=window.getSelection(),r=document.createRange();r.selectNodeContents(t),o.removeAllRanges(),o.addRange(r),e=o.toString()}return e}t.exports=n}])});
},{}],3:[function(require,module,exports){
(function (process,global){
/**
 * [js-md5]{@link https://github.com/emn178/js-md5}
 *
 * @namespace md5
 * @version 0.7.3
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
(function () {
  'use strict';

  var ERROR = 'input is invalid type';
  var WINDOW = typeof window === 'object';
  var root = WINDOW ? window : {};
  if (root.JS_MD5_NO_WINDOW) {
    WINDOW = false;
  }
  var WEB_WORKER = !WINDOW && typeof self === 'object';
  var NODE_JS = !root.JS_MD5_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;
  if (NODE_JS) {
    root = global;
  } else if (WEB_WORKER) {
    root = self;
  }
  var COMMON_JS = !root.JS_MD5_NO_COMMON_JS && typeof module === 'object' && module.exports;
  var AMD = typeof define === 'function' && define.amd;
  var ARRAY_BUFFER = !root.JS_MD5_NO_ARRAY_BUFFER && typeof ArrayBuffer !== 'undefined';
  var HEX_CHARS = '0123456789abcdef'.split('');
  var EXTRA = [128, 32768, 8388608, -2147483648];
  var SHIFT = [0, 8, 16, 24];
  var OUTPUT_TYPES = ['hex', 'array', 'digest', 'buffer', 'arrayBuffer', 'base64'];
  var BASE64_ENCODE_CHAR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

  var blocks = [], buffer8;
  if (ARRAY_BUFFER) {
    var buffer = new ArrayBuffer(68);
    buffer8 = new Uint8Array(buffer);
    blocks = new Uint32Array(buffer);
  }

  if (root.JS_MD5_NO_NODE_JS || !Array.isArray) {
    Array.isArray = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    };
  }

  if (ARRAY_BUFFER && (root.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
    ArrayBuffer.isView = function (obj) {
      return typeof obj === 'object' && obj.buffer && obj.buffer.constructor === ArrayBuffer;
    };
  }

  /**
   * @method hex
   * @memberof md5
   * @description Output hash as hex string
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {String} Hex string
   * @example
   * md5.hex('The quick brown fox jumps over the lazy dog');
   * // equal to
   * md5('The quick brown fox jumps over the lazy dog');
   */
  /**
   * @method digest
   * @memberof md5
   * @description Output hash as bytes array
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {Array} Bytes array
   * @example
   * md5.digest('The quick brown fox jumps over the lazy dog');
   */
  /**
   * @method array
   * @memberof md5
   * @description Output hash as bytes array
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {Array} Bytes array
   * @example
   * md5.array('The quick brown fox jumps over the lazy dog');
   */
  /**
   * @method arrayBuffer
   * @memberof md5
   * @description Output hash as ArrayBuffer
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {ArrayBuffer} ArrayBuffer
   * @example
   * md5.arrayBuffer('The quick brown fox jumps over the lazy dog');
   */
  /**
   * @method buffer
   * @deprecated This maybe confuse with Buffer in node.js. Please use arrayBuffer instead.
   * @memberof md5
   * @description Output hash as ArrayBuffer
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {ArrayBuffer} ArrayBuffer
   * @example
   * md5.buffer('The quick brown fox jumps over the lazy dog');
   */
  /**
   * @method base64
   * @memberof md5
   * @description Output hash as base64 string
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {String} base64 string
   * @example
   * md5.base64('The quick brown fox jumps over the lazy dog');
   */
  var createOutputMethod = function (outputType) {
    return function (message) {
      return new Md5(true).update(message)[outputType]();
    };
  };

  /**
   * @method create
   * @memberof md5
   * @description Create Md5 object
   * @returns {Md5} Md5 object.
   * @example
   * var hash = md5.create();
   */
  /**
   * @method update
   * @memberof md5
   * @description Create and update Md5 object
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {Md5} Md5 object.
   * @example
   * var hash = md5.update('The quick brown fox jumps over the lazy dog');
   * // equal to
   * var hash = md5.create();
   * hash.update('The quick brown fox jumps over the lazy dog');
   */
  var createMethod = function () {
    var method = createOutputMethod('hex');
    if (NODE_JS) {
      method = nodeWrap(method);
    }
    method.create = function () {
      return new Md5();
    };
    method.update = function (message) {
      return method.create().update(message);
    };
    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
      var type = OUTPUT_TYPES[i];
      method[type] = createOutputMethod(type);
    }
    return method;
  };

  var nodeWrap = function (method) {
    var crypto = eval("require('crypto')");
    var Buffer = eval("require('buffer').Buffer");
    var nodeMethod = function (message) {
      if (typeof message === 'string') {
        return crypto.createHash('md5').update(message, 'utf8').digest('hex');
      } else {
        if (message === null || message === undefined) {
          throw ERROR;
        } else if (message.constructor === ArrayBuffer) {
          message = new Uint8Array(message);
        }
      }
      if (Array.isArray(message) || ArrayBuffer.isView(message) ||
        message.constructor === Buffer) {
        return crypto.createHash('md5').update(new Buffer(message)).digest('hex');
      } else {
        return method(message);
      }
    };
    return nodeMethod;
  };

  /**
   * Md5 class
   * @class Md5
   * @description This is internal class.
   * @see {@link md5.create}
   */
  function Md5(sharedMemory) {
    if (sharedMemory) {
      blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] =
      blocks[4] = blocks[5] = blocks[6] = blocks[7] =
      blocks[8] = blocks[9] = blocks[10] = blocks[11] =
      blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      this.blocks = blocks;
      this.buffer8 = buffer8;
    } else {
      if (ARRAY_BUFFER) {
        var buffer = new ArrayBuffer(68);
        this.buffer8 = new Uint8Array(buffer);
        this.blocks = new Uint32Array(buffer);
      } else {
        this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      }
    }
    this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = this.hBytes = 0;
    this.finalized = this.hashed = false;
    this.first = true;
  }

  /**
   * @method update
   * @memberof Md5
   * @instance
   * @description Update hash
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {Md5} Md5 object.
   * @see {@link md5.update}
   */
  Md5.prototype.update = function (message) {
    if (this.finalized) {
      return;
    }

    var notString, type = typeof message;
    if (type !== 'string') {
      if (type === 'object') {
        if (message === null) {
          throw ERROR;
        } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
          message = new Uint8Array(message);
        } else if (!Array.isArray(message)) {
          if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
            throw ERROR;
          }
        }
      } else {
        throw ERROR;
      }
      notString = true;
    }
    var code, index = 0, i, length = message.length, blocks = this.blocks;
    var buffer8 = this.buffer8;

    while (index < length) {
      if (this.hashed) {
        this.hashed = false;
        blocks[0] = blocks[16];
        blocks[16] = blocks[1] = blocks[2] = blocks[3] =
        blocks[4] = blocks[5] = blocks[6] = blocks[7] =
        blocks[8] = blocks[9] = blocks[10] = blocks[11] =
        blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      }

      if (notString) {
        if (ARRAY_BUFFER) {
          for (i = this.start; index < length && i < 64; ++index) {
            buffer8[i++] = message[index];
          }
        } else {
          for (i = this.start; index < length && i < 64; ++index) {
            blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
          }
        }
      } else {
        if (ARRAY_BUFFER) {
          for (i = this.start; index < length && i < 64; ++index) {
            code = message.charCodeAt(index);
            if (code < 0x80) {
              buffer8[i++] = code;
            } else if (code < 0x800) {
              buffer8[i++] = 0xc0 | (code >> 6);
              buffer8[i++] = 0x80 | (code & 0x3f);
            } else if (code < 0xd800 || code >= 0xe000) {
              buffer8[i++] = 0xe0 | (code >> 12);
              buffer8[i++] = 0x80 | ((code >> 6) & 0x3f);
              buffer8[i++] = 0x80 | (code & 0x3f);
            } else {
              code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
              buffer8[i++] = 0xf0 | (code >> 18);
              buffer8[i++] = 0x80 | ((code >> 12) & 0x3f);
              buffer8[i++] = 0x80 | ((code >> 6) & 0x3f);
              buffer8[i++] = 0x80 | (code & 0x3f);
            }
          }
        } else {
          for (i = this.start; index < length && i < 64; ++index) {
            code = message.charCodeAt(index);
            if (code < 0x80) {
              blocks[i >> 2] |= code << SHIFT[i++ & 3];
            } else if (code < 0x800) {
              blocks[i >> 2] |= (0xc0 | (code >> 6)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
            } else if (code < 0xd800 || code >= 0xe000) {
              blocks[i >> 2] |= (0xe0 | (code >> 12)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
            } else {
              code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
              blocks[i >> 2] |= (0xf0 | (code >> 18)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | ((code >> 12) & 0x3f)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
            }
          }
        }
      }
      this.lastByteIndex = i;
      this.bytes += i - this.start;
      if (i >= 64) {
        this.start = i - 64;
        this.hash();
        this.hashed = true;
      } else {
        this.start = i;
      }
    }
    if (this.bytes > 4294967295) {
      this.hBytes += this.bytes / 4294967296 << 0;
      this.bytes = this.bytes % 4294967296;
    }
    return this;
  };

  Md5.prototype.finalize = function () {
    if (this.finalized) {
      return;
    }
    this.finalized = true;
    var blocks = this.blocks, i = this.lastByteIndex;
    blocks[i >> 2] |= EXTRA[i & 3];
    if (i >= 56) {
      if (!this.hashed) {
        this.hash();
      }
      blocks[0] = blocks[16];
      blocks[16] = blocks[1] = blocks[2] = blocks[3] =
      blocks[4] = blocks[5] = blocks[6] = blocks[7] =
      blocks[8] = blocks[9] = blocks[10] = blocks[11] =
      blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
    }
    blocks[14] = this.bytes << 3;
    blocks[15] = this.hBytes << 3 | this.bytes >>> 29;
    this.hash();
  };

  Md5.prototype.hash = function () {
    var a, b, c, d, bc, da, blocks = this.blocks;

    if (this.first) {
      a = blocks[0] - 680876937;
      a = (a << 7 | a >>> 25) - 271733879 << 0;
      d = (-1732584194 ^ a & 2004318071) + blocks[1] - 117830708;
      d = (d << 12 | d >>> 20) + a << 0;
      c = (-271733879 ^ (d & (a ^ -271733879))) + blocks[2] - 1126478375;
      c = (c << 17 | c >>> 15) + d << 0;
      b = (a ^ (c & (d ^ a))) + blocks[3] - 1316259209;
      b = (b << 22 | b >>> 10) + c << 0;
    } else {
      a = this.h0;
      b = this.h1;
      c = this.h2;
      d = this.h3;
      a += (d ^ (b & (c ^ d))) + blocks[0] - 680876936;
      a = (a << 7 | a >>> 25) + b << 0;
      d += (c ^ (a & (b ^ c))) + blocks[1] - 389564586;
      d = (d << 12 | d >>> 20) + a << 0;
      c += (b ^ (d & (a ^ b))) + blocks[2] + 606105819;
      c = (c << 17 | c >>> 15) + d << 0;
      b += (a ^ (c & (d ^ a))) + blocks[3] - 1044525330;
      b = (b << 22 | b >>> 10) + c << 0;
    }

    a += (d ^ (b & (c ^ d))) + blocks[4] - 176418897;
    a = (a << 7 | a >>> 25) + b << 0;
    d += (c ^ (a & (b ^ c))) + blocks[5] + 1200080426;
    d = (d << 12 | d >>> 20) + a << 0;
    c += (b ^ (d & (a ^ b))) + blocks[6] - 1473231341;
    c = (c << 17 | c >>> 15) + d << 0;
    b += (a ^ (c & (d ^ a))) + blocks[7] - 45705983;
    b = (b << 22 | b >>> 10) + c << 0;
    a += (d ^ (b & (c ^ d))) + blocks[8] + 1770035416;
    a = (a << 7 | a >>> 25) + b << 0;
    d += (c ^ (a & (b ^ c))) + blocks[9] - 1958414417;
    d = (d << 12 | d >>> 20) + a << 0;
    c += (b ^ (d & (a ^ b))) + blocks[10] - 42063;
    c = (c << 17 | c >>> 15) + d << 0;
    b += (a ^ (c & (d ^ a))) + blocks[11] - 1990404162;
    b = (b << 22 | b >>> 10) + c << 0;
    a += (d ^ (b & (c ^ d))) + blocks[12] + 1804603682;
    a = (a << 7 | a >>> 25) + b << 0;
    d += (c ^ (a & (b ^ c))) + blocks[13] - 40341101;
    d = (d << 12 | d >>> 20) + a << 0;
    c += (b ^ (d & (a ^ b))) + blocks[14] - 1502002290;
    c = (c << 17 | c >>> 15) + d << 0;
    b += (a ^ (c & (d ^ a))) + blocks[15] + 1236535329;
    b = (b << 22 | b >>> 10) + c << 0;
    a += (c ^ (d & (b ^ c))) + blocks[1] - 165796510;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ (c & (a ^ b))) + blocks[6] - 1069501632;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ (b & (d ^ a))) + blocks[11] + 643717713;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ (a & (c ^ d))) + blocks[0] - 373897302;
    b = (b << 20 | b >>> 12) + c << 0;
    a += (c ^ (d & (b ^ c))) + blocks[5] - 701558691;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ (c & (a ^ b))) + blocks[10] + 38016083;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ (b & (d ^ a))) + blocks[15] - 660478335;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ (a & (c ^ d))) + blocks[4] - 405537848;
    b = (b << 20 | b >>> 12) + c << 0;
    a += (c ^ (d & (b ^ c))) + blocks[9] + 568446438;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ (c & (a ^ b))) + blocks[14] - 1019803690;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ (b & (d ^ a))) + blocks[3] - 187363961;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ (a & (c ^ d))) + blocks[8] + 1163531501;
    b = (b << 20 | b >>> 12) + c << 0;
    a += (c ^ (d & (b ^ c))) + blocks[13] - 1444681467;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ (c & (a ^ b))) + blocks[2] - 51403784;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ (b & (d ^ a))) + blocks[7] + 1735328473;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ (a & (c ^ d))) + blocks[12] - 1926607734;
    b = (b << 20 | b >>> 12) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[5] - 378558;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[8] - 2022574463;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[11] + 1839030562;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[14] - 35309556;
    b = (b << 23 | b >>> 9) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[1] - 1530992060;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[4] + 1272893353;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[7] - 155497632;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[10] - 1094730640;
    b = (b << 23 | b >>> 9) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[13] + 681279174;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[0] - 358537222;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[3] - 722521979;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[6] + 76029189;
    b = (b << 23 | b >>> 9) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[9] - 640364487;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[12] - 421815835;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[15] + 530742520;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[2] - 995338651;
    b = (b << 23 | b >>> 9) + c << 0;
    a += (c ^ (b | ~d)) + blocks[0] - 198630844;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[7] + 1126891415;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[14] - 1416354905;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[5] - 57434055;
    b = (b << 21 | b >>> 11) + c << 0;
    a += (c ^ (b | ~d)) + blocks[12] + 1700485571;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[3] - 1894986606;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[10] - 1051523;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[1] - 2054922799;
    b = (b << 21 | b >>> 11) + c << 0;
    a += (c ^ (b | ~d)) + blocks[8] + 1873313359;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[15] - 30611744;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[6] - 1560198380;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[13] + 1309151649;
    b = (b << 21 | b >>> 11) + c << 0;
    a += (c ^ (b | ~d)) + blocks[4] - 145523070;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[11] - 1120210379;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[2] + 718787259;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[9] - 343485551;
    b = (b << 21 | b >>> 11) + c << 0;

    if (this.first) {
      this.h0 = a + 1732584193 << 0;
      this.h1 = b - 271733879 << 0;
      this.h2 = c - 1732584194 << 0;
      this.h3 = d + 271733878 << 0;
      this.first = false;
    } else {
      this.h0 = this.h0 + a << 0;
      this.h1 = this.h1 + b << 0;
      this.h2 = this.h2 + c << 0;
      this.h3 = this.h3 + d << 0;
    }
  };

  /**
   * @method hex
   * @memberof Md5
   * @instance
   * @description Output hash as hex string
   * @returns {String} Hex string
   * @see {@link md5.hex}
   * @example
   * hash.hex();
   */
  Md5.prototype.hex = function () {
    this.finalize();

    var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3;

    return HEX_CHARS[(h0 >> 4) & 0x0F] + HEX_CHARS[h0 & 0x0F] +
      HEX_CHARS[(h0 >> 12) & 0x0F] + HEX_CHARS[(h0 >> 8) & 0x0F] +
      HEX_CHARS[(h0 >> 20) & 0x0F] + HEX_CHARS[(h0 >> 16) & 0x0F] +
      HEX_CHARS[(h0 >> 28) & 0x0F] + HEX_CHARS[(h0 >> 24) & 0x0F] +
      HEX_CHARS[(h1 >> 4) & 0x0F] + HEX_CHARS[h1 & 0x0F] +
      HEX_CHARS[(h1 >> 12) & 0x0F] + HEX_CHARS[(h1 >> 8) & 0x0F] +
      HEX_CHARS[(h1 >> 20) & 0x0F] + HEX_CHARS[(h1 >> 16) & 0x0F] +
      HEX_CHARS[(h1 >> 28) & 0x0F] + HEX_CHARS[(h1 >> 24) & 0x0F] +
      HEX_CHARS[(h2 >> 4) & 0x0F] + HEX_CHARS[h2 & 0x0F] +
      HEX_CHARS[(h2 >> 12) & 0x0F] + HEX_CHARS[(h2 >> 8) & 0x0F] +
      HEX_CHARS[(h2 >> 20) & 0x0F] + HEX_CHARS[(h2 >> 16) & 0x0F] +
      HEX_CHARS[(h2 >> 28) & 0x0F] + HEX_CHARS[(h2 >> 24) & 0x0F] +
      HEX_CHARS[(h3 >> 4) & 0x0F] + HEX_CHARS[h3 & 0x0F] +
      HEX_CHARS[(h3 >> 12) & 0x0F] + HEX_CHARS[(h3 >> 8) & 0x0F] +
      HEX_CHARS[(h3 >> 20) & 0x0F] + HEX_CHARS[(h3 >> 16) & 0x0F] +
      HEX_CHARS[(h3 >> 28) & 0x0F] + HEX_CHARS[(h3 >> 24) & 0x0F];
  };

  /**
   * @method toString
   * @memberof Md5
   * @instance
   * @description Output hash as hex string
   * @returns {String} Hex string
   * @see {@link md5.hex}
   * @example
   * hash.toString();
   */
  Md5.prototype.toString = Md5.prototype.hex;

  /**
   * @method digest
   * @memberof Md5
   * @instance
   * @description Output hash as bytes array
   * @returns {Array} Bytes array
   * @see {@link md5.digest}
   * @example
   * hash.digest();
   */
  Md5.prototype.digest = function () {
    this.finalize();

    var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3;
    return [
      h0 & 0xFF, (h0 >> 8) & 0xFF, (h0 >> 16) & 0xFF, (h0 >> 24) & 0xFF,
      h1 & 0xFF, (h1 >> 8) & 0xFF, (h1 >> 16) & 0xFF, (h1 >> 24) & 0xFF,
      h2 & 0xFF, (h2 >> 8) & 0xFF, (h2 >> 16) & 0xFF, (h2 >> 24) & 0xFF,
      h3 & 0xFF, (h3 >> 8) & 0xFF, (h3 >> 16) & 0xFF, (h3 >> 24) & 0xFF
    ];
  };

  /**
   * @method array
   * @memberof Md5
   * @instance
   * @description Output hash as bytes array
   * @returns {Array} Bytes array
   * @see {@link md5.array}
   * @example
   * hash.array();
   */
  Md5.prototype.array = Md5.prototype.digest;

  /**
   * @method arrayBuffer
   * @memberof Md5
   * @instance
   * @description Output hash as ArrayBuffer
   * @returns {ArrayBuffer} ArrayBuffer
   * @see {@link md5.arrayBuffer}
   * @example
   * hash.arrayBuffer();
   */
  Md5.prototype.arrayBuffer = function () {
    this.finalize();

    var buffer = new ArrayBuffer(16);
    var blocks = new Uint32Array(buffer);
    blocks[0] = this.h0;
    blocks[1] = this.h1;
    blocks[2] = this.h2;
    blocks[3] = this.h3;
    return buffer;
  };

  /**
   * @method buffer
   * @deprecated This maybe confuse with Buffer in node.js. Please use arrayBuffer instead.
   * @memberof Md5
   * @instance
   * @description Output hash as ArrayBuffer
   * @returns {ArrayBuffer} ArrayBuffer
   * @see {@link md5.buffer}
   * @example
   * hash.buffer();
   */
  Md5.prototype.buffer = Md5.prototype.arrayBuffer;

  /**
   * @method base64
   * @memberof Md5
   * @instance
   * @description Output hash as base64 string
   * @returns {String} base64 string
   * @see {@link md5.base64}
   * @example
   * hash.base64();
   */
  Md5.prototype.base64 = function () {
    var v1, v2, v3, base64Str = '', bytes = this.array();
    for (var i = 0; i < 15;) {
      v1 = bytes[i++];
      v2 = bytes[i++];
      v3 = bytes[i++];
      base64Str += BASE64_ENCODE_CHAR[v1 >>> 2] +
        BASE64_ENCODE_CHAR[(v1 << 4 | v2 >>> 4) & 63] +
        BASE64_ENCODE_CHAR[(v2 << 2 | v3 >>> 6) & 63] +
        BASE64_ENCODE_CHAR[v3 & 63];
    }
    v1 = bytes[i];
    base64Str += BASE64_ENCODE_CHAR[v1 >>> 2] +
      BASE64_ENCODE_CHAR[(v1 << 4) & 63] +
      '==';
    return base64Str;
  };

  var exports = createMethod();

  if (COMMON_JS) {
    module.exports = exports;
  } else {
    /**
     * @method md5
     * @description Md5 hash function, export to global in browsers.
     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
     * @returns {String} md5 hashes
     * @example
     * md5(''); // d41d8cd98f00b204e9800998ecf8427e
     * md5('The quick brown fox jumps over the lazy dog'); // 9e107d9d372bb6826bd81d3542a419d6
     * md5('The quick brown fox jumps over the lazy dog.'); // e4d909c290d0fb1ca068ffaddf22cbd0
     *
     * // It also supports UTF-8 encoding
     * md5('中文'); // a7bac2239fcdcb3a067903d8077c4a07
     *
     * // It also supports byte `Array`, `Uint8Array`, `ArrayBuffer`
     * md5([]); // d41d8cd98f00b204e9800998ecf8427e
     * md5(new Uint8Array([])); // d41d8cd98f00b204e9800998ecf8427e
     */
    root.md5 = exports;
    if (AMD) {
      define(function () {
        return exports;
      });
    }
  }
})();

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"_process":4}],4:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],5:[function(require,module,exports){
/*!
* sweetalert2 v7.25.0
* Released under the MIT License.
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Sweetalert2 = factory());
}(this, (function () { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};





var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var consolePrefix = 'SweetAlert2:';

/**
 * Filter the unique values into a new array
 * @param arr
 */
var uniqueArray = function uniqueArray(arr) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    if (result.indexOf(arr[i]) === -1) {
      result.push(arr[i]);
    }
  }
  return result;
};

/**
 * Converts `inputOptions` into an array of `[value, label]`s
 * @param inputOptions
 */
var formatInputOptions = function formatInputOptions(inputOptions) {
  var result = [];
  if (typeof Map !== 'undefined' && inputOptions instanceof Map) {
    inputOptions.forEach(function (value, key) {
      result.push([key, value]);
    });
  } else {
    Object.keys(inputOptions).forEach(function (key) {
      result.push([key, inputOptions[key]]);
    });
  }
  return result;
};

/**
 * Standardise console warnings
 * @param message
 */
var warn = function warn(message) {
  console.warn(consolePrefix + ' ' + message);
};

/**
 * Standardise console errors
 * @param message
 */
var error = function error(message) {
  console.error(consolePrefix + ' ' + message);
};

/**
 * Private global state for `warnOnce`
 * @type {Array}
 * @private
 */
var previousWarnOnceMessages = [];

/**
 * Show a console warning, but only if it hasn't already been shown
 * @param message
 */
var warnOnce = function warnOnce(message) {
  if (!(previousWarnOnceMessages.indexOf(message) !== -1)) {
    previousWarnOnceMessages.push(message);
    warn(message);
  }
};

/**
 * If `arg` is a function, call it (with no arguments or context) and return the result.
 * Otherwise, just pass the value through
 * @param arg
 */
var callIfFunction = function callIfFunction(arg) {
  return typeof arg === 'function' ? arg() : arg;
};

var isThenable = function isThenable(arg) {
  return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && typeof arg.then === 'function';
};

var DismissReason = Object.freeze({
  cancel: 'cancel',
  backdrop: 'overlay',
  close: 'close',
  esc: 'esc',
  timer: 'timer'
});

var version = "7.25.0";

var argsToParams = function argsToParams(args) {
  var params = {};
  switch (_typeof(args[0])) {
    case 'string':
      ['title', 'html', 'type'].forEach(function (name, index) {
        switch (_typeof(args[index])) {
          case 'string':
            params[name] = args[index];
            break;
          case 'undefined':
            break;
          default:
            error('Unexpected type of ' + name + '! Expected "string", got ' + _typeof(args[index]));
        }
      });
      break;

    case 'object':
      _extends(params, args[0]);
      break;

    default:
      error('Unexpected type of argument! Expected "string" or "object", got ' + _typeof(args[0]));
      return false;
  }
  return params;
};

/**
 * Adapt a legacy inputValidator for use with expectRejections=false
 */
var adaptInputValidator = function adaptInputValidator(legacyValidator) {
  return function adaptedInputValidator(inputValue, extraParams) {
    return legacyValidator.call(this, inputValue, extraParams).then(function () {
      return undefined;
    }, function (validationError) {
      return validationError;
    });
  };
};

var swalPrefix = 'swal2-';

var prefix = function prefix(items) {
  var result = {};
  for (var i in items) {
    result[items[i]] = swalPrefix + items[i];
  }
  return result;
};

var swalClasses = prefix(['container', 'shown', 'height-auto', 'iosfix', 'popup', 'modal', 'no-backdrop', 'toast', 'toast-shown', 'fade', 'show', 'hide', 'noanimation', 'close', 'title', 'header', 'content', 'actions', 'confirm', 'cancel', 'footer', 'icon', 'icon-text', 'image', 'input', 'has-input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea', 'inputerror', 'validationerror', 'progresssteps', 'activeprogressstep', 'progresscircle', 'progressline', 'loading', 'styled', 'top', 'top-start', 'top-end', 'top-left', 'top-right', 'center', 'center-start', 'center-end', 'center-left', 'center-right', 'bottom', 'bottom-start', 'bottom-end', 'bottom-left', 'bottom-right', 'grow-row', 'grow-column', 'grow-fullscreen']);

var iconTypes = prefix(['success', 'warning', 'info', 'question', 'error']);

// Remember state in cases where opening and handling a modal will fiddle with it.
var states = {
  previousBodyPadding: null
};

var hasClass = function hasClass(elem, className) {
  if (elem.classList) {
    return elem.classList.contains(className);
  }
  return false;
};

var focusInput = function focusInput(input) {
  input.focus();

  // place cursor at end of text in text input
  if (input.type !== 'file') {
    // http://stackoverflow.com/a/2345915/1331425
    var val = input.value;
    input.value = '';
    input.value = val;
  }
};

var addOrRemoveClass = function addOrRemoveClass(target, classList, add) {
  if (!target || !classList) {
    return;
  }
  if (typeof classList === 'string') {
    classList = classList.split(/\s+/).filter(Boolean);
  }
  classList.forEach(function (className) {
    if (target.forEach) {
      target.forEach(function (elem) {
        add ? elem.classList.add(className) : elem.classList.remove(className);
      });
    } else {
      add ? target.classList.add(className) : target.classList.remove(className);
    }
  });
};

var addClass = function addClass(target, classList) {
  addOrRemoveClass(target, classList, true);
};

var removeClass = function removeClass(target, classList) {
  addOrRemoveClass(target, classList, false);
};

var getChildByClass = function getChildByClass(elem, className) {
  for (var i = 0; i < elem.childNodes.length; i++) {
    if (hasClass(elem.childNodes[i], className)) {
      return elem.childNodes[i];
    }
  }
};

var show = function show(elem) {
  elem.style.opacity = '';
  elem.style.display = elem.id === swalClasses.content ? 'block' : 'flex';
};

var hide = function hide(elem) {
  elem.style.opacity = '';
  elem.style.display = 'none';
};

var empty = function empty(elem) {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
};

// borrowed from jquery $(elem).is(':visible') implementation
var isVisible = function isVisible(elem) {
  return elem && (elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
};

var removeStyleProperty = function removeStyleProperty(elem, property) {
  if (elem.style.removeProperty) {
    elem.style.removeProperty(property);
  } else {
    elem.style.removeAttribute(property);
  }
};

var getContainer = function getContainer() {
  return document.body.querySelector('.' + swalClasses.container);
};

var elementByClass = function elementByClass(className) {
  var container = getContainer();
  return container ? container.querySelector('.' + className) : null;
};

var getPopup = function getPopup() {
  return elementByClass(swalClasses.popup);
};

var getIcons = function getIcons() {
  var popup = getPopup();
  return Array.prototype.slice.call(popup.querySelectorAll('.' + swalClasses.icon));
};

var getTitle = function getTitle() {
  return elementByClass(swalClasses.title);
};

var getContent = function getContent() {
  return elementByClass(swalClasses.content);
};

var getImage = function getImage() {
  return elementByClass(swalClasses.image);
};

var getProgressSteps = function getProgressSteps() {
  return elementByClass(swalClasses.progresssteps);
};

var getValidationError = function getValidationError() {
  return elementByClass(swalClasses.validationerror);
};

var getConfirmButton = function getConfirmButton() {
  return elementByClass(swalClasses.confirm);
};

var getCancelButton = function getCancelButton() {
  return elementByClass(swalClasses.cancel);
};

var getButtonsWrapper = function getButtonsWrapper() {
  warnOnce('swal.getButtonsWrapper() is deprecated and will be removed in the next major release, use swal.getActions() instead');
  return elementByClass(swalClasses.actions);
};

var getActions = function getActions() {
  return elementByClass(swalClasses.actions);
};

var getFooter = function getFooter() {
  return elementByClass(swalClasses.footer);
};

var getCloseButton = function getCloseButton() {
  return elementByClass(swalClasses.close);
};

var getFocusableElements = function getFocusableElements() {
  var focusableElementsWithTabindex = Array.prototype.slice.call(getPopup().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])'))
  // sort according to tabindex
  .sort(function (a, b) {
    a = parseInt(a.getAttribute('tabindex'));
    b = parseInt(b.getAttribute('tabindex'));
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    }
    return 0;
  });

  // https://github.com/jkup/focusable/blob/master/index.js
  var otherFocusableElements = Array.prototype.slice.call(getPopup().querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable], audio[controls], video[controls]'));

  return uniqueArray(focusableElementsWithTabindex.concat(otherFocusableElements));
};

var isModal = function isModal() {
  return !document.body.classList.contains(swalClasses['toast-shown']);
};

var isToast = function isToast() {
  return document.body.classList.contains(swalClasses['toast-shown']);
};

var isLoading = function isLoading() {
  return getPopup().hasAttribute('data-loading');
};

// Detect Node env
var isNodeEnv = function isNodeEnv() {
  return typeof window === 'undefined' || typeof document === 'undefined';
};

var sweetHTML = ('\n <div aria-labelledby="' + swalClasses.title + '" aria-describedby="' + swalClasses.content + '" class="' + swalClasses.popup + '" tabindex="-1">\n   <div class="' + swalClasses.header + '">\n     <ul class="' + swalClasses.progresssteps + '"></ul>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.error + '">\n       <span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span>\n     </div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.question + '">\n       <span class="' + swalClasses['icon-text'] + '">?</span>\n      </div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.warning + '">\n       <span class="' + swalClasses['icon-text'] + '">!</span>\n      </div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.info + '">\n       <span class="' + swalClasses['icon-text'] + '">i</span>\n      </div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.success + '">\n       <div class="swal2-success-circular-line-left"></div>\n       <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n       <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n       <div class="swal2-success-circular-line-right"></div>\n     </div>\n     <img class="' + swalClasses.image + '" />\n     <h2 class="' + swalClasses.title + '" id="' + swalClasses.title + '"></h2>\n     <button type="button" class="' + swalClasses.close + '">\xD7</button>\n   </div>\n   <div class="' + swalClasses.content + '">\n     <div id="' + swalClasses.content + '"></div>\n     <input class="' + swalClasses.input + '" />\n     <input type="file" class="' + swalClasses.file + '" />\n     <div class="' + swalClasses.range + '">\n       <input type="range" />\n       <output></output>\n     </div>\n     <select class="' + swalClasses.select + '"></select>\n     <div class="' + swalClasses.radio + '"></div>\n     <label for="' + swalClasses.checkbox + '" class="' + swalClasses.checkbox + '">\n       <input type="checkbox" />\n     </label>\n     <textarea class="' + swalClasses.textarea + '"></textarea>\n     <div class="' + swalClasses.validationerror + '" id="' + swalClasses.validationerror + '"></div>\n   </div>\n   <div class="' + swalClasses.actions + '">\n     <button type="button" class="' + swalClasses.confirm + '">OK</button>\n     <button type="button" class="' + swalClasses.cancel + '">Cancel</button>\n   </div>\n   <div class="' + swalClasses.footer + '">\n   </div>\n </div>\n').replace(/(^|\n)\s*/g, '');

/*
 * Add modal + backdrop to DOM
 */
var init = function init(params) {
  // Clean up the old popup if it exists
  var c = getContainer();
  if (c) {
    c.parentNode.removeChild(c);
    removeClass([document.documentElement, document.body], [swalClasses['no-backdrop'], swalClasses['has-input'], swalClasses['toast-shown']]);
  }

  if (isNodeEnv()) {
    error('SweetAlert2 requires document to initialize');
    return;
  }

  var container = document.createElement('div');
  container.className = swalClasses.container;
  container.innerHTML = sweetHTML;

  var targetElement = typeof params.target === 'string' ? document.querySelector(params.target) : params.target;
  targetElement.appendChild(container);

  var popup = getPopup();
  var content = getContent();
  var input = getChildByClass(content, swalClasses.input);
  var file = getChildByClass(content, swalClasses.file);
  var range = content.querySelector('.' + swalClasses.range + ' input');
  var rangeOutput = content.querySelector('.' + swalClasses.range + ' output');
  var select = getChildByClass(content, swalClasses.select);
  var checkbox = content.querySelector('.' + swalClasses.checkbox + ' input');
  var textarea = getChildByClass(content, swalClasses.textarea);

  // a11y
  popup.setAttribute('role', params.toast ? 'alert' : 'dialog');
  popup.setAttribute('aria-live', params.toast ? 'polite' : 'assertive');
  if (!params.toast) {
    popup.setAttribute('aria-modal', 'true');
  }

  var oldInputVal = void 0; // IE11 workaround, see #1109 for details
  var resetValidationError = function resetValidationError(e) {
    if (Swal.isVisible() && oldInputVal !== e.target.value) {
      Swal.resetValidationError();
    }
    oldInputVal = e.target.value;
  };

  input.oninput = resetValidationError;
  file.onchange = resetValidationError;
  select.onchange = resetValidationError;
  checkbox.onchange = resetValidationError;
  textarea.oninput = resetValidationError;

  range.oninput = function (e) {
    resetValidationError(e);
    rangeOutput.value = range.value;
  };

  range.onchange = function (e) {
    resetValidationError(e);
    range.nextSibling.value = range.value;
  };

  return popup;
};

var parseHtmlToContainer = function parseHtmlToContainer(param, target) {
  if (!param) {
    return hide(target);
  }

  if ((typeof param === 'undefined' ? 'undefined' : _typeof(param)) === 'object') {
    target.innerHTML = '';
    if (0 in param) {
      for (var i = 0; i in param; i++) {
        target.appendChild(param[i].cloneNode(true));
      }
    } else {
      target.appendChild(param.cloneNode(true));
    }
  } else if (param) {
    target.innerHTML = param;
  } else {}
  show(target);
};

var animationEndEvent = function () {
  // Prevent run in Node env
  if (isNodeEnv()) {
    return false;
  }

  var testEl = document.createElement('div');
  var transEndEventNames = {
    'WebkitAnimation': 'webkitAnimationEnd',
    'OAnimation': 'oAnimationEnd oanimationend',
    'animation': 'animationend'
  };
  for (var i in transEndEventNames) {
    if (transEndEventNames.hasOwnProperty(i) && typeof testEl.style[i] !== 'undefined') {
      return transEndEventNames[i];
    }
  }

  return false;
}();

// Measure width of scrollbar
// https://github.com/twbs/bootstrap/blob/master/js/modal.js#L279-L286
var measureScrollbar = function measureScrollbar() {
  var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
  if (supportsTouch) {
    return 0;
  }
  var scrollDiv = document.createElement('div');
  scrollDiv.style.width = '50px';
  scrollDiv.style.height = '50px';
  scrollDiv.style.overflow = 'scroll';
  document.body.appendChild(scrollDiv);
  var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
};

var fixScrollbar = function fixScrollbar() {
  // for queues, do not do this more than once
  if (states.previousBodyPadding !== null) {
    return;
  }
  // if the body has overflow
  if (document.body.scrollHeight > window.innerHeight) {
    // add padding so the content doesn't shift after removal of scrollbar
    states.previousBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right'));
    document.body.style.paddingRight = states.previousBodyPadding + measureScrollbar() + 'px';
  }
};

var undoScrollbar = function undoScrollbar() {
  if (states.previousBodyPadding !== null) {
    document.body.style.paddingRight = states.previousBodyPadding;
    states.previousBodyPadding = null;
  }
};

// Fix iOS scrolling http://stackoverflow.com/q/39626302/1331425
var iOSfix = function iOSfix() {
  var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (iOS && !hasClass(document.body, swalClasses.iosfix)) {
    var offset = document.body.scrollTop;
    document.body.style.top = offset * -1 + 'px';
    addClass(document.body, swalClasses.iosfix);
  }
};

var undoIOSfix = function undoIOSfix() {
  if (hasClass(document.body, swalClasses.iosfix)) {
    var offset = parseInt(document.body.style.top, 10);
    removeClass(document.body, swalClasses.iosfix);
    document.body.style.top = '';
    document.body.scrollTop = offset * -1;
  }
};

var RESTORE_FOCUS_TIMEOUT = 100;

var globalState = {};

// Restore previous active (focused) element
var restoreActiveElement = function restoreActiveElement() {
  var x = window.scrollX;
  var y = window.scrollY;
  globalState.restoreFocusTimeout = setTimeout(function () {
    if (globalState.previousActiveElement && globalState.previousActiveElement.focus) {
      globalState.previousActiveElement.focus();
      globalState.previousActiveElement = null;
    }
  }, RESTORE_FOCUS_TIMEOUT); // issues/900
  if (typeof x !== 'undefined' && typeof y !== 'undefined') {
    // IE doesn't have scrollX/scrollY support
    window.scrollTo(x, y);
  }
};

/*
 * Global function to close sweetAlert
 */
var close = function close(onClose, onAfterClose) {
  var container = getContainer();
  var popup = getPopup();
  if (!popup) {
    return;
  }

  if (onClose !== null && typeof onClose === 'function') {
    onClose(popup);
  }

  removeClass(popup, swalClasses.show);
  addClass(popup, swalClasses.hide);

  var removePopupAndResetState = function removePopupAndResetState() {
    if (!isToast()) {
      restoreActiveElement();
      globalState.keydownTarget.removeEventListener('keydown', globalState.keydownHandler, { capture: globalState.keydownListenerCapture });
      globalState.keydownHandlerAdded = false;
    }

    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
    removeClass([document.documentElement, document.body], [swalClasses.shown, swalClasses['height-auto'], swalClasses['no-backdrop'], swalClasses['has-input'], swalClasses['toast-shown']]);

    if (isModal()) {
      undoScrollbar();
      undoIOSfix();
    }

    if (onAfterClose !== null && typeof onAfterClose === 'function') {
      setTimeout(function () {
        onAfterClose();
      });
    }
  };

  // If animation is supported, animate
  if (animationEndEvent && !hasClass(popup, swalClasses.noanimation)) {
    popup.addEventListener(animationEndEvent, function swalCloseEventFinished() {
      popup.removeEventListener(animationEndEvent, swalCloseEventFinished);
      if (hasClass(popup, swalClasses.hide)) {
        removePopupAndResetState();
      }
    });
  } else {
    // Otherwise, remove immediately
    removePopupAndResetState();
  }
};

/*
 * Global function to determine if swal2 popup is shown
 */
var isVisible$1 = function isVisible() {
  return !!getPopup();
};

/*
 * Global function to click 'Confirm' button
 */
var clickConfirm = function clickConfirm() {
  return getConfirmButton().click();
};

/*
 * Global function to click 'Cancel' button
 */
var clickCancel = function clickCancel() {
  return getCancelButton().click();
};

function fire() {
  var Swal = this;

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return new (Function.prototype.bind.apply(Swal, [null].concat(args)))();
}

/**
 * Extends a Swal class making it able to be instantiated without the `new` keyword (and thus without `Swal.fire`)
 * @param ParentSwal
 * @returns {NoNewKeywordSwal}
 */
function withNoNewKeyword(ParentSwal) {
  var NoNewKeywordSwal = function NoNewKeywordSwal() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (!(this instanceof NoNewKeywordSwal)) {
      return new (Function.prototype.bind.apply(NoNewKeywordSwal, [null].concat(args)))();
    }
    Object.getPrototypeOf(NoNewKeywordSwal).apply(this, args);
  };
  NoNewKeywordSwal.prototype = _extends(Object.create(ParentSwal.prototype), { constructor: NoNewKeywordSwal });

  if (typeof Object.setPrototypeOf === 'function') {
    Object.setPrototypeOf(NoNewKeywordSwal, ParentSwal);
  } else {
    // Android 4.4
    // eslint-disable-next-line
    NoNewKeywordSwal.__proto__ = ParentSwal;
  }
  return NoNewKeywordSwal;
}

var defaultParams = {
  title: '',
  titleText: '',
  text: '',
  html: '',
  footer: '',
  type: null,
  toast: false,
  customClass: '',
  target: 'body',
  backdrop: true,
  animation: true,
  heightAuto: true,
  allowOutsideClick: true,
  allowEscapeKey: true,
  allowEnterKey: true,
  stopKeydownPropagation: true,
  keydownListenerCapture: false,
  showConfirmButton: true,
  showCancelButton: false,
  preConfirm: null,
  confirmButtonText: 'OK',
  confirmButtonAriaLabel: '',
  confirmButtonColor: null,
  confirmButtonClass: null,
  cancelButtonText: 'Cancel',
  cancelButtonAriaLabel: '',
  cancelButtonColor: null,
  cancelButtonClass: null,
  buttonsStyling: true,
  reverseButtons: false,
  focusConfirm: true,
  focusCancel: false,
  showCloseButton: false,
  closeButtonAriaLabel: 'Close this dialog',
  showLoaderOnConfirm: false,
  imageUrl: null,
  imageWidth: null,
  imageHeight: null,
  imageAlt: '',
  imageClass: null,
  timer: null,
  width: null,
  padding: null,
  background: null,
  input: null,
  inputPlaceholder: '',
  inputValue: '',
  inputOptions: {},
  inputAutoTrim: true,
  inputClass: null,
  inputAttributes: {},
  inputValidator: null,
  grow: false,
  position: 'center',
  progressSteps: [],
  currentProgressStep: null,
  progressStepsDistance: null,
  onBeforeOpen: null,
  onAfterClose: null,
  onOpen: null,
  onClose: null,
  useRejections: false,
  expectRejections: false
};

var deprecatedParams = ['useRejections', 'expectRejections'];

/**
 * Is valid parameter
 * @param {String} paramName
 */
var isValidParameter = function isValidParameter(paramName) {
  return defaultParams.hasOwnProperty(paramName) || paramName === 'extraParams';
};

/**
 * Is deprecated parameter
 * @param {String} paramName
 */
var isDeprecatedParameter = function isDeprecatedParameter(paramName) {
  return deprecatedParams.indexOf(paramName) !== -1;
};

/**
 * Show relevant warnings for given params
 *
 * @param params
 */
var showWarningsForParams = function showWarningsForParams(params) {
  for (var param in params) {
    if (!isValidParameter(param)) {
      warn('Unknown parameter "' + param + '"');
    }
    if (isDeprecatedParameter(param)) {
      warnOnce('The parameter "' + param + '" is deprecated and will be removed in the next major release.');
    }
  }
};

var deprecationWarning = '"setDefaults" & "resetDefaults" methods are deprecated in favor of "mixin" method and will be removed in the next major release. For new projects, use "mixin". For past projects already using "setDefaults", support will be provided through an additional package.';
var defaults$1 = {};

function withGlobalDefaults(ParentSwal) {
  var SwalWithGlobalDefaults = function (_ParentSwal) {
    inherits(SwalWithGlobalDefaults, _ParentSwal);

    function SwalWithGlobalDefaults() {
      classCallCheck(this, SwalWithGlobalDefaults);
      return possibleConstructorReturn(this, (SwalWithGlobalDefaults.__proto__ || Object.getPrototypeOf(SwalWithGlobalDefaults)).apply(this, arguments));
    }

    createClass(SwalWithGlobalDefaults, [{
      key: '_main',
      value: function _main(params) {
        return get(SwalWithGlobalDefaults.prototype.__proto__ || Object.getPrototypeOf(SwalWithGlobalDefaults.prototype), '_main', this).call(this, _extends({}, defaults$1, params));
      }
    }], [{
      key: 'setDefaults',
      value: function setDefaults(params) {
        warnOnce(deprecationWarning);
        if (!params || (typeof params === 'undefined' ? 'undefined' : _typeof(params)) !== 'object') {
          throw new TypeError('SweetAlert2: The argument for setDefaults() is required and has to be a object');
        }
        showWarningsForParams(params);
        // assign valid params from `params` to `defaults`
        Object.keys(params).forEach(function (param) {
          if (ParentSwal.isValidParameter(param)) {
            defaults$1[param] = params[param];
          }
        });
      }
    }, {
      key: 'resetDefaults',
      value: function resetDefaults() {
        warnOnce(deprecationWarning);
        defaults$1 = {};
      }
    }]);
    return SwalWithGlobalDefaults;
  }(ParentSwal);

  // Set default params if `window._swalDefaults` is an object


  if (typeof window !== 'undefined' && _typeof(window._swalDefaults) === 'object') {
    SwalWithGlobalDefaults.setDefaults(window._swalDefaults);
  }

  return SwalWithGlobalDefaults;
}

/**
 * Returns an extended version of `Swal` containing `params` as defaults.
 * Useful for reusing Swal configuration.
 *
 * For example:
 *
 * Before:
 * const textPromptOptions = { input: 'text', showCancelButton: true }
 * const {value: firstName} = await Swal({ ...textPromptOptions, title: 'What is your first name?' })
 * const {value: lastName} = await Swal({ ...textPromptOptions, title: 'What is your last name?' })
 *
 * After:
 * const TextPrompt = Swal.mixin({ input: 'text', showCancelButton: true })
 * const {value: firstName} = await TextPrompt('What is your first name?')
 * const {value: lastName} = await TextPrompt('What is your last name?')
 *
 * @param mixinParams
 */
function mixin(mixinParams) {
  return withNoNewKeyword(function (_ref) {
    inherits(MixinSwal, _ref);

    function MixinSwal() {
      classCallCheck(this, MixinSwal);
      return possibleConstructorReturn(this, (MixinSwal.__proto__ || Object.getPrototypeOf(MixinSwal)).apply(this, arguments));
    }

    createClass(MixinSwal, [{
      key: '_main',
      value: function _main(params) {
        return get(MixinSwal.prototype.__proto__ || Object.getPrototypeOf(MixinSwal.prototype), '_main', this).call(this, _extends({}, mixinParams, params));
      }
    }]);
    return MixinSwal;
  }(this));
}

// private global state for the queue feature
var currentSteps = [];

/*
 * Global function for chaining sweetAlert popups
 */
var queue = function queue(steps) {
  var swal = this;
  currentSteps = steps;
  var resetQueue = function resetQueue() {
    currentSteps = [];
    document.body.removeAttribute('data-swal2-queue-step');
  };
  var queueResult = [];
  return new Promise(function (resolve, reject) {
    (function step(i, callback) {
      if (i < currentSteps.length) {
        document.body.setAttribute('data-swal2-queue-step', i);

        swal(currentSteps[i]).then(function (result) {
          if (typeof result.value !== 'undefined') {
            queueResult.push(result.value);
            step(i + 1, callback);
          } else {
            resetQueue();
            resolve({ dismiss: result.dismiss });
          }
        });
      } else {
        resetQueue();
        resolve({ value: queueResult });
      }
    })(0);
  });
};

/*
 * Global function for getting the index of current popup in queue
 */
var getQueueStep = function getQueueStep() {
  return document.body.getAttribute('data-swal2-queue-step');
};

/*
 * Global function for inserting a popup to the queue
 */
var insertQueueStep = function insertQueueStep(step, index) {
  if (index && index < currentSteps.length) {
    return currentSteps.splice(index, 0, step);
  }
  return currentSteps.push(step);
};

/*
 * Global function for deleting a popup from the queue
 */
var deleteQueueStep = function deleteQueueStep(index) {
  if (typeof currentSteps[index] !== 'undefined') {
    currentSteps.splice(index, 1);
  }
};

/**
 * Show spinner instead of Confirm button and disable Cancel button
 */
var showLoading = function showLoading() {
  var popup = getPopup();
  if (!popup) {
    Swal('');
  }
  popup = getPopup();
  var actions = getActions();
  var confirmButton = getConfirmButton();
  var cancelButton = getCancelButton();

  show(actions);
  show(confirmButton);
  addClass([popup, actions], swalClasses.loading);
  confirmButton.disabled = true;
  cancelButton.disabled = true;

  popup.setAttribute('data-loading', true);
  popup.setAttribute('aria-busy', true);
  popup.focus();
};

/**
 * Show spinner instead of Confirm button and disable Cancel button
 */
var getTimerLeft = function getTimerLeft() {
  return globalState.timeout && globalState.timeout.getTimerLeft();
};



var staticMethods = Object.freeze({
	isValidParameter: isValidParameter,
	isDeprecatedParameter: isDeprecatedParameter,
	argsToParams: argsToParams,
	adaptInputValidator: adaptInputValidator,
	close: close,
	closePopup: close,
	closeModal: close,
	closeToast: close,
	isVisible: isVisible$1,
	clickConfirm: clickConfirm,
	clickCancel: clickCancel,
	getPopup: getPopup,
	getTitle: getTitle,
	getContent: getContent,
	getImage: getImage,
	getIcons: getIcons,
	getButtonsWrapper: getButtonsWrapper,
	getActions: getActions,
	getConfirmButton: getConfirmButton,
	getCancelButton: getCancelButton,
	getFooter: getFooter,
	isLoading: isLoading,
	fire: fire,
	mixin: mixin,
	queue: queue,
	getQueueStep: getQueueStep,
	insertQueueStep: insertQueueStep,
	deleteQueueStep: deleteQueueStep,
	showLoading: showLoading,
	enableLoading: showLoading,
	getTimerLeft: getTimerLeft
});

// https://github.com/Riim/symbol-polyfill/blob/master/index.js

var _Symbol = typeof Symbol === 'function' ? Symbol : function () {
  var idCounter = 0;
  function _Symbol(key) {
    return '__' + key + '_' + Math.floor(Math.random() * 1e9) + '_' + ++idCounter + '__';
  }
  _Symbol.iterator = _Symbol('Symbol.iterator');
  return _Symbol;
}();

// WeakMap polyfill, needed for Android 4.4
// Related issue: https://github.com/sweetalert2/sweetalert2/issues/1071
// http://webreflection.blogspot.fi/2015/04/a-weakmap-polyfill-in-20-lines-of-code.html

var WeakMap$1 = typeof WeakMap === 'function' ? WeakMap : function (s, dP, hOP) {
  function WeakMap() {
    dP(this, s, { value: _Symbol('WeakMap') });
  }
  WeakMap.prototype = {
    'delete': function del(o) {
      delete o[this[s]];
    },
    get: function get(o) {
      return o[this[s]];
    },
    has: function has(o) {
      return hOP.call(o, this[s]);
    },
    set: function set(o, v) {
      dP(o, this[s], { configurable: true, value: v });
    }
  };
  return WeakMap;
}(_Symbol('WeakMap'), Object.defineProperty, {}.hasOwnProperty);

/**
 * This module containts `WeakMap`s for each effectively-"private  property" that a `swal` has.
 * For example, to set the private property "foo" of `this` to "bar", you can `privateProps.foo.set(this, 'bar')`
 * This is the approach that Babel will probably take to implement private methods/fields
 *   https://github.com/tc39/proposal-private-methods
 *   https://github.com/babel/babel/pull/7555
 * Once we have the changes from that PR in Babel, and our core class fits reasonable in *one module*
 *   then we can use that language feature.
 */

var privateProps = {
  promise: new WeakMap$1(),
  innerParams: new WeakMap$1(),
  domCache: new WeakMap$1()
};

/**
 * Show spinner instead of Confirm button and disable Cancel button
 */
function hideLoading() {
  var innerParams = privateProps.innerParams.get(this);
  var domCache = privateProps.domCache.get(this);
  if (!innerParams.showConfirmButton) {
    hide(domCache.confirmButton);
    if (!innerParams.showCancelButton) {
      hide(domCache.actions);
    }
  }
  removeClass([domCache.popup, domCache.actions], swalClasses.loading);
  domCache.popup.removeAttribute('aria-busy');
  domCache.popup.removeAttribute('data-loading');
  domCache.confirmButton.disabled = false;
  domCache.cancelButton.disabled = false;
}

// Get input element by specified type or, if type isn't specified, by params.input
function getInput(inputType) {
  var innerParams = privateProps.innerParams.get(this);
  var domCache = privateProps.domCache.get(this);
  inputType = inputType || innerParams.input;
  if (!inputType) {
    return null;
  }
  switch (inputType) {
    case 'select':
    case 'textarea':
    case 'file':
      return getChildByClass(domCache.content, swalClasses[inputType]);
    case 'checkbox':
      return domCache.popup.querySelector('.' + swalClasses.checkbox + ' input');
    case 'radio':
      return domCache.popup.querySelector('.' + swalClasses.radio + ' input:checked') || domCache.popup.querySelector('.' + swalClasses.radio + ' input:first-child');
    case 'range':
      return domCache.popup.querySelector('.' + swalClasses.range + ' input');
    default:
      return getChildByClass(domCache.content, swalClasses.input);
  }
}

function enableButtons() {
  var domCache = privateProps.domCache.get(this);
  domCache.confirmButton.disabled = false;
  domCache.cancelButton.disabled = false;
}

function disableButtons() {
  var domCache = privateProps.domCache.get(this);
  domCache.confirmButton.disabled = true;
  domCache.cancelButton.disabled = true;
}

function enableConfirmButton() {
  var domCache = privateProps.domCache.get(this);
  domCache.confirmButton.disabled = false;
}

function disableConfirmButton() {
  var domCache = privateProps.domCache.get(this);
  domCache.confirmButton.disabled = true;
}

function enableInput() {
  var input = this.getInput();
  if (!input) {
    return false;
  }
  if (input.type === 'radio') {
    var radiosContainer = input.parentNode.parentNode;
    var radios = radiosContainer.querySelectorAll('input');
    for (var i = 0; i < radios.length; i++) {
      radios[i].disabled = false;
    }
  } else {
    input.disabled = false;
  }
}

function disableInput() {
  var input = this.getInput();
  if (!input) {
    return false;
  }
  if (input && input.type === 'radio') {
    var radiosContainer = input.parentNode.parentNode;
    var radios = radiosContainer.querySelectorAll('input');
    for (var i = 0; i < radios.length; i++) {
      radios[i].disabled = true;
    }
  } else {
    input.disabled = true;
  }
}

// Show block with validation error
function showValidationError(error) {
  var domCache = privateProps.domCache.get(this);
  domCache.validationError.innerHTML = error;
  var popupComputedStyle = window.getComputedStyle(domCache.popup);
  domCache.validationError.style.marginLeft = '-' + popupComputedStyle.getPropertyValue('padding-left');
  domCache.validationError.style.marginRight = '-' + popupComputedStyle.getPropertyValue('padding-right');
  show(domCache.validationError);

  var input = this.getInput();
  if (input) {
    input.setAttribute('aria-invalid', true);
    input.setAttribute('aria-describedBy', swalClasses.validationerror);
    focusInput(input);
    addClass(input, swalClasses.inputerror);
  }
}

// Hide block with validation error
function resetValidationError() {
  var domCache = privateProps.domCache.get(this);
  if (domCache.validationError) {
    hide(domCache.validationError);
  }

  var input = this.getInput();
  if (input) {
    input.removeAttribute('aria-invalid');
    input.removeAttribute('aria-describedBy');
    removeClass(input, swalClasses.inputerror);
  }
}

var Timer = function Timer(callback, delay) {
  classCallCheck(this, Timer);

  var id, started, running;
  var remaining = delay;
  this.start = function () {
    running = true;
    started = new Date();
    id = setTimeout(callback, remaining);
  };
  this.stop = function () {
    running = false;
    clearTimeout(id);
    remaining -= new Date() - started;
  };
  this.getTimerLeft = function () {
    if (running) {
      this.stop();
      this.start();
    }
    return remaining;
  };
  this.getStateRunning = function () {
    return running;
  };
  this.start();
};

var defaultInputValidators = {
  email: function email(string, extraParams) {
    return (/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(string) ? Promise.resolve() : Promise.reject(extraParams && extraParams.validationMessage ? extraParams.validationMessage : 'Invalid email address')
    );
  },
  url: function url(string, extraParams) {
    // taken from https://stackoverflow.com/a/3809435/1331425
    return (/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(string) ? Promise.resolve() : Promise.reject(extraParams && extraParams.validationMessage ? extraParams.validationMessage : 'Invalid URL')
    );
  }
};

/**
 * Set type, text and actions on popup
 *
 * @param params
 * @returns {boolean}
 */
function setParameters(params) {
  // Use default `inputValidator` for supported input types if not provided
  if (!params.inputValidator) {
    Object.keys(defaultInputValidators).forEach(function (key) {
      if (params.input === key) {
        params.inputValidator = params.expectRejections ? defaultInputValidators[key] : Swal.adaptInputValidator(defaultInputValidators[key]);
      }
    });
  }

  // Determine if the custom target element is valid
  if (!params.target || typeof params.target === 'string' && !document.querySelector(params.target) || typeof params.target !== 'string' && !params.target.appendChild) {
    warn('Target parameter is not valid, defaulting to "body"');
    params.target = 'body';
  }

  var popup = void 0;
  var oldPopup = getPopup();
  var targetElement = typeof params.target === 'string' ? document.querySelector(params.target) : params.target;
  // If the model target has changed, refresh the popup
  if (oldPopup && targetElement && oldPopup.parentNode !== targetElement.parentNode) {
    popup = init(params);
  } else {
    popup = oldPopup || init(params);
  }

  // Set popup width
  if (params.width) {
    popup.style.width = typeof params.width === 'number' ? params.width + 'px' : params.width;
  }

  // Set popup padding
  if (params.padding) {
    popup.style.padding = typeof params.padding === 'number' ? params.padding + 'px' : params.padding;
  }

  // Set popup background
  if (params.background) {
    popup.style.background = params.background;
  }
  var popupBackgroundColor = window.getComputedStyle(popup).getPropertyValue('background-color');
  var successIconParts = popup.querySelectorAll('[class^=swal2-success-circular-line], .swal2-success-fix');
  for (var i = 0; i < successIconParts.length; i++) {
    successIconParts[i].style.backgroundColor = popupBackgroundColor;
  }

  var container = getContainer();
  var title = getTitle();
  var content = getContent().querySelector('#' + swalClasses.content);
  var actions = getActions();
  var confirmButton = getConfirmButton();
  var cancelButton = getCancelButton();
  var closeButton = getCloseButton();
  var footer = getFooter();

  // Title
  if (params.titleText) {
    title.innerText = params.titleText;
  } else if (params.title) {
    title.innerHTML = params.title.split('\n').join('<br />');
  }

  if (typeof params.backdrop === 'string') {
    getContainer().style.background = params.backdrop;
  } else if (!params.backdrop) {
    addClass([document.documentElement, document.body], swalClasses['no-backdrop']);
  }

  // Content as HTML
  if (params.html) {
    parseHtmlToContainer(params.html, content);

    // Content as plain text
  } else if (params.text) {
    content.textContent = params.text;
    show(content);
  } else {
    hide(content);
  }

  // Position
  if (params.position in swalClasses) {
    addClass(container, swalClasses[params.position]);
  } else {
    warn('The "position" parameter is not valid, defaulting to "center"');
    addClass(container, swalClasses.center);
  }

  // Grow
  if (params.grow && typeof params.grow === 'string') {
    var growClass = 'grow-' + params.grow;
    if (growClass in swalClasses) {
      addClass(container, swalClasses[growClass]);
    }
  }

  // Animation
  if (typeof params.animation === 'function') {
    params.animation = params.animation.call();
  }

  // Close button
  if (params.showCloseButton) {
    closeButton.setAttribute('aria-label', params.closeButtonAriaLabel);
    show(closeButton);
  } else {
    hide(closeButton);
  }

  // Default Class
  popup.className = swalClasses.popup;
  if (params.toast) {
    addClass([document.documentElement, document.body], swalClasses['toast-shown']);
    addClass(popup, swalClasses.toast);
  } else {
    addClass(popup, swalClasses.modal);
  }

  // Custom Class
  if (params.customClass) {
    addClass(popup, params.customClass);
  }

  // Progress steps
  var progressStepsContainer = getProgressSteps();
  var currentProgressStep = parseInt(params.currentProgressStep === null ? Swal.getQueueStep() : params.currentProgressStep, 10);
  if (params.progressSteps && params.progressSteps.length) {
    show(progressStepsContainer);
    empty(progressStepsContainer);
    if (currentProgressStep >= params.progressSteps.length) {
      warn('Invalid currentProgressStep parameter, it should be less than progressSteps.length ' + '(currentProgressStep like JS arrays starts from 0)');
    }
    params.progressSteps.forEach(function (step, index) {
      var circle = document.createElement('li');
      addClass(circle, swalClasses.progresscircle);
      circle.innerHTML = step;
      if (index === currentProgressStep) {
        addClass(circle, swalClasses.activeprogressstep);
      }
      progressStepsContainer.appendChild(circle);
      if (index !== params.progressSteps.length - 1) {
        var line = document.createElement('li');
        addClass(line, swalClasses.progressline);
        if (params.progressStepsDistance) {
          line.style.width = params.progressStepsDistance;
        }
        progressStepsContainer.appendChild(line);
      }
    });
  } else {
    hide(progressStepsContainer);
  }

  // Icon
  var icons = getIcons();
  for (var _i = 0; _i < icons.length; _i++) {
    hide(icons[_i]);
  }
  if (params.type) {
    var validType = false;
    for (var iconType in iconTypes) {
      if (params.type === iconType) {
        validType = true;
        break;
      }
    }
    if (!validType) {
      error('Unknown alert type: ' + params.type);
      return false;
    }
    var icon = popup.querySelector('.' + swalClasses.icon + '.' + iconTypes[params.type]);
    show(icon);

    // Animate icon
    if (params.animation) {
      addClass(icon, 'swal2-animate-' + params.type + '-icon');
    }
  }

  // Custom image
  var image = getImage();
  if (params.imageUrl) {
    image.setAttribute('src', params.imageUrl);
    image.setAttribute('alt', params.imageAlt);
    show(image);

    if (params.imageWidth) {
      image.setAttribute('width', params.imageWidth);
    } else {
      image.removeAttribute('width');
    }

    if (params.imageHeight) {
      image.setAttribute('height', params.imageHeight);
    } else {
      image.removeAttribute('height');
    }

    image.className = swalClasses.image;
    if (params.imageClass) {
      addClass(image, params.imageClass);
    }
  } else {
    hide(image);
  }

  // Cancel button
  if (params.showCancelButton) {
    cancelButton.style.display = 'inline-block';
  } else {
    hide(cancelButton);
  }

  // Confirm button
  if (params.showConfirmButton) {
    removeStyleProperty(confirmButton, 'display');
  } else {
    hide(confirmButton);
  }

  // Actions (buttons) wrapper
  if (!params.showConfirmButton && !params.showCancelButton) {
    hide(actions);
  } else {
    show(actions);
  }

  // Edit text on confirm and cancel buttons
  confirmButton.innerHTML = params.confirmButtonText;
  cancelButton.innerHTML = params.cancelButtonText;

  // ARIA labels for confirm and cancel buttons
  confirmButton.setAttribute('aria-label', params.confirmButtonAriaLabel);
  cancelButton.setAttribute('aria-label', params.cancelButtonAriaLabel);

  // Add buttons custom classes
  confirmButton.className = swalClasses.confirm;
  addClass(confirmButton, params.confirmButtonClass);
  cancelButton.className = swalClasses.cancel;
  addClass(cancelButton, params.cancelButtonClass);

  // Buttons styling
  if (params.buttonsStyling) {
    addClass([confirmButton, cancelButton], swalClasses.styled);

    // Buttons background colors
    if (params.confirmButtonColor) {
      confirmButton.style.backgroundColor = params.confirmButtonColor;
    }
    if (params.cancelButtonColor) {
      cancelButton.style.backgroundColor = params.cancelButtonColor;
    }

    // Loading state
    var confirmButtonBackgroundColor = window.getComputedStyle(confirmButton).getPropertyValue('background-color');
    confirmButton.style.borderLeftColor = confirmButtonBackgroundColor;
    confirmButton.style.borderRightColor = confirmButtonBackgroundColor;
  } else {
    removeClass([confirmButton, cancelButton], swalClasses.styled);

    confirmButton.style.backgroundColor = confirmButton.style.borderLeftColor = confirmButton.style.borderRightColor = '';
    cancelButton.style.backgroundColor = cancelButton.style.borderLeftColor = cancelButton.style.borderRightColor = '';
  }

  // Footer
  parseHtmlToContainer(params.footer, footer);

  // CSS animation
  if (params.animation === true) {
    removeClass(popup, swalClasses.noanimation);
  } else {
    addClass(popup, swalClasses.noanimation);
  }

  // showLoaderOnConfirm && preConfirm
  if (params.showLoaderOnConfirm && !params.preConfirm) {
    warn('showLoaderOnConfirm is set to true, but preConfirm is not defined.\n' + 'showLoaderOnConfirm should be used together with preConfirm, see usage example:\n' + 'https://sweetalert2.github.io/#ajax-request');
  }
}

/**
 * Open popup, add necessary classes and styles, fix scrollbar
 *
 * @param {Array} params
 */
var openPopup = function openPopup(params) {
  var container = getContainer();
  var popup = getPopup();

  if (params.onBeforeOpen !== null && typeof params.onBeforeOpen === 'function') {
    params.onBeforeOpen(popup);
  }

  if (params.animation) {
    addClass(popup, swalClasses.show);
    addClass(container, swalClasses.fade);
    removeClass(popup, swalClasses.hide);
  } else {
    removeClass(popup, swalClasses.fade);
  }
  show(popup);

  // scrolling is 'hidden' until animation is done, after that 'auto'
  container.style.overflowY = 'hidden';
  if (animationEndEvent && !hasClass(popup, swalClasses.noanimation)) {
    popup.addEventListener(animationEndEvent, function swalCloseEventFinished() {
      popup.removeEventListener(animationEndEvent, swalCloseEventFinished);
      container.style.overflowY = 'auto';
    });
  } else {
    container.style.overflowY = 'auto';
  }

  addClass([document.documentElement, document.body, container], swalClasses.shown);
  if (params.heightAuto && params.backdrop && !params.toast) {
    addClass([document.documentElement, document.body], swalClasses['height-auto']);
  }

  if (isModal()) {
    fixScrollbar();
    iOSfix();
  }
  if (!isToast() && !globalState.previousActiveElement) {
    globalState.previousActiveElement = document.activeElement;
  }
  if (params.onOpen !== null && typeof params.onOpen === 'function') {
    setTimeout(function () {
      params.onOpen(popup);
    });
  }
};

function _main(userParams) {
  var _this = this;

  showWarningsForParams(userParams);

  var innerParams = _extends({}, defaultParams, userParams);
  setParameters(innerParams);
  Object.freeze(innerParams);
  privateProps.innerParams.set(this, innerParams);

  // clear the previous timer
  if (globalState.timeout) {
    globalState.timeout.stop();
    delete globalState.timeout;
  }

  // clear the restore focus timeout
  clearTimeout(globalState.restoreFocusTimeout);

  var domCache = {
    popup: getPopup(),
    container: getContainer(),
    content: getContent(),
    actions: getActions(),
    confirmButton: getConfirmButton(),
    cancelButton: getCancelButton(),
    closeButton: getCloseButton(),
    validationError: getValidationError(),
    progressSteps: getProgressSteps()
  };
  privateProps.domCache.set(this, domCache);

  var constructor = this.constructor;

  return new Promise(function (resolve, reject) {
    // functions to handle all resolving/rejecting/settling
    var succeedWith = function succeedWith(value) {
      constructor.closePopup(innerParams.onClose, innerParams.onAfterClose); // TODO: make closePopup an *instance* method
      if (innerParams.useRejections) {
        resolve(value);
      } else {
        resolve({ value: value });
      }
    };
    var dismissWith = function dismissWith(dismiss) {
      constructor.closePopup(innerParams.onClose, innerParams.onAfterClose);
      if (innerParams.useRejections) {
        reject(dismiss);
      } else {
        resolve({ dismiss: dismiss });
      }
    };
    var errorWith = function errorWith(error$$1) {
      constructor.closePopup(innerParams.onClose, innerParams.onAfterClose);
      reject(error$$1);
    };

    // Close on timer
    if (innerParams.timer) {
      globalState.timeout = new Timer(function () {
        dismissWith('timer');
        delete globalState.timeout;
      }, innerParams.timer);
    }

    // Get the value of the popup input
    var getInputValue = function getInputValue() {
      var input = _this.getInput();
      if (!input) {
        return null;
      }
      switch (innerParams.input) {
        case 'checkbox':
          return input.checked ? 1 : 0;
        case 'radio':
          return input.checked ? input.value : null;
        case 'file':
          return input.files.length ? input.files[0] : null;
        default:
          return innerParams.inputAutoTrim ? input.value.trim() : input.value;
      }
    };

    // input autofocus
    if (innerParams.input) {
      setTimeout(function () {
        var input = _this.getInput();
        if (input) {
          focusInput(input);
        }
      }, 0);
    }

    var confirm = function confirm(value) {
      if (innerParams.showLoaderOnConfirm) {
        constructor.showLoading(); // TODO: make showLoading an *instance* method
      }

      if (innerParams.preConfirm) {
        _this.resetValidationError();
        var preConfirmPromise = Promise.resolve().then(function () {
          return innerParams.preConfirm(value, innerParams.extraParams);
        });
        if (innerParams.expectRejections) {
          preConfirmPromise.then(function (preConfirmValue) {
            return succeedWith(preConfirmValue || value);
          }, function (validationError) {
            _this.hideLoading();
            if (validationError) {
              _this.showValidationError(validationError);
            }
          });
        } else {
          preConfirmPromise.then(function (preConfirmValue) {
            if (isVisible(domCache.validationError) || preConfirmValue === false) {
              _this.hideLoading();
            } else {
              succeedWith(preConfirmValue || value);
            }
          }, function (error$$1) {
            return errorWith(error$$1);
          });
        }
      } else {
        succeedWith(value);
      }
    };

    // Mouse interactions
    var onButtonEvent = function onButtonEvent(event) {
      var e = event || window.event;
      var target = e.target || e.srcElement;
      var confirmButton = domCache.confirmButton,
          cancelButton = domCache.cancelButton;

      var targetedConfirm = confirmButton && (confirmButton === target || confirmButton.contains(target));
      var targetedCancel = cancelButton && (cancelButton === target || cancelButton.contains(target));

      switch (e.type) {
        case 'click':
          // Clicked 'confirm'
          if (targetedConfirm && constructor.isVisible()) {
            _this.disableButtons();
            if (innerParams.input) {
              var inputValue = getInputValue();

              if (innerParams.inputValidator) {
                _this.disableInput();
                var validationPromise = Promise.resolve().then(function () {
                  return innerParams.inputValidator(inputValue, innerParams.extraParams);
                });
                if (innerParams.expectRejections) {
                  validationPromise.then(function () {
                    _this.enableButtons();
                    _this.enableInput();
                    confirm(inputValue);
                  }, function (validationError) {
                    _this.enableButtons();
                    _this.enableInput();
                    if (validationError) {
                      _this.showValidationError(validationError);
                    }
                  });
                } else {
                  validationPromise.then(function (validationError) {
                    _this.enableButtons();
                    _this.enableInput();
                    if (validationError) {
                      _this.showValidationError(validationError);
                    } else {
                      confirm(inputValue);
                    }
                  }, function (error$$1) {
                    return errorWith(error$$1);
                  });
                }
              } else {
                confirm(inputValue);
              }
            } else {
              confirm(true);
            }

            // Clicked 'cancel'
          } else if (targetedCancel && constructor.isVisible()) {
            _this.disableButtons();
            dismissWith(constructor.DismissReason.cancel);
          }
          break;
        default:
      }
    };

    var buttons = domCache.popup.querySelectorAll('button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].onclick = onButtonEvent;
      buttons[i].onmouseover = onButtonEvent;
      buttons[i].onmouseout = onButtonEvent;
      buttons[i].onmousedown = onButtonEvent;
    }

    // Closing popup by close button
    domCache.closeButton.onclick = function () {
      dismissWith(constructor.DismissReason.close);
    };

    if (innerParams.toast) {
      // Closing popup by internal click
      domCache.popup.onclick = function (e) {
        if (innerParams.showConfirmButton || innerParams.showCancelButton || innerParams.showCloseButton || innerParams.input) {
          return;
        }
        constructor.closePopup(innerParams.onClose, innerParams.onAfterClose);
        dismissWith(constructor.DismissReason.close);
      };
    } else {
      var ignoreOutsideClick = false;

      // Ignore click events that had mousedown on the popup but mouseup on the container
      // This can happen when the user drags a slider
      domCache.popup.onmousedown = function () {
        domCache.container.onmouseup = function (e) {
          domCache.container.onmouseup = undefined;
          // We only check if the mouseup target is the container because usually it doesn't
          // have any other direct children aside of the popup
          if (e.target === domCache.container) {
            ignoreOutsideClick = true;
          }
        };
      };

      // Ignore click events that had mousedown on the container but mouseup on the popup
      domCache.container.onmousedown = function () {
        domCache.popup.onmouseup = function (e) {
          domCache.popup.onmouseup = undefined;
          // We also need to check if the mouseup target is a child of the popup
          if (e.target === domCache.popup || domCache.popup.contains(e.target)) {
            ignoreOutsideClick = true;
          }
        };
      };

      domCache.container.onclick = function (e) {
        if (ignoreOutsideClick) {
          ignoreOutsideClick = false;
          return;
        }
        if (e.target !== domCache.container) {
          return;
        }
        if (callIfFunction(innerParams.allowOutsideClick)) {
          dismissWith(constructor.DismissReason.backdrop);
        }
      };
    }

    // Reverse buttons (Confirm on the right side)
    if (innerParams.reverseButtons) {
      domCache.confirmButton.parentNode.insertBefore(domCache.cancelButton, domCache.confirmButton);
    } else {
      domCache.confirmButton.parentNode.insertBefore(domCache.confirmButton, domCache.cancelButton);
    }

    // Focus handling
    var setFocus = function setFocus(index, increment) {
      var focusableElements = getFocusableElements(innerParams.focusCancel);
      // search for visible elements and select the next possible match
      for (var _i = 0; _i < focusableElements.length; _i++) {
        index = index + increment;

        // rollover to first item
        if (index === focusableElements.length) {
          index = 0;

          // go to last item
        } else if (index === -1) {
          index = focusableElements.length - 1;
        }

        // determine if element is visible
        var el = focusableElements[index];
        if (isVisible(el)) {
          return el.focus();
        }
      }
      // no visible focusable elements, focus the popup
      domCache.popup.focus();
    };

    var keydownHandler = function keydownHandler(e, innerParams) {
      if (innerParams.stopKeydownPropagation) {
        e.stopPropagation();
      }

      var arrowKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Left', 'Right', 'Up', 'Down' // IE11
      ];

      if (e.key === 'Enter' && !e.isComposing) {
        if (e.target && _this.getInput() && e.target.outerHTML === _this.getInput().outerHTML) {
          if (['textarea', 'file'].indexOf(innerParams.input) !== -1) {
            return; // do not submit
          }

          constructor.clickConfirm();
          e.preventDefault();
        }

        // TAB
      } else if (e.key === 'Tab') {
        var targetElement = e.target || e.srcElement;

        var focusableElements = getFocusableElements(innerParams.focusCancel);
        var btnIndex = -1; // Find the button - note, this is a nodelist, not an array.
        for (var _i2 = 0; _i2 < focusableElements.length; _i2++) {
          if (targetElement === focusableElements[_i2]) {
            btnIndex = _i2;
            break;
          }
        }

        if (!e.shiftKey) {
          // Cycle to the next button
          setFocus(btnIndex, 1);
        } else {
          // Cycle to the prev button
          setFocus(btnIndex, -1);
        }
        e.stopPropagation();
        e.preventDefault();

        // ARROWS - switch focus between buttons
      } else if (arrowKeys.indexOf(e.key) !== -1) {
        // focus Cancel button if Confirm button is currently focused
        if (document.activeElement === domCache.confirmButton && isVisible(domCache.cancelButton)) {
          domCache.cancelButton.focus();
          // and vice versa
        } else if (document.activeElement === domCache.cancelButton && isVisible(domCache.confirmButton)) {
          domCache.confirmButton.focus();
        }

        // ESC
      } else if ((e.key === 'Escape' || e.key === 'Esc') && callIfFunction(innerParams.allowEscapeKey) === true) {
        dismissWith(constructor.DismissReason.esc);
      }
    };

    if (globalState.keydownHandlerAdded) {
      globalState.keydownTarget.removeEventListener('keydown', globalState.keydownHandler, { capture: globalState.keydownListenerCapture });
      globalState.keydownHandlerAdded = false;
    }

    if (!innerParams.toast) {
      globalState.keydownHandler = function (e) {
        return keydownHandler(e, innerParams);
      };
      globalState.keydownTarget = innerParams.keydownListenerCapture ? window : domCache.popup;
      globalState.keydownListenerCapture = innerParams.keydownListenerCapture;
      globalState.keydownTarget.addEventListener('keydown', globalState.keydownHandler, { capture: globalState.keydownListenerCapture });
      globalState.keydownHandlerAdded = true;
    }

    _this.enableButtons();
    _this.hideLoading();
    _this.resetValidationError();

    if (innerParams.input) {
      addClass(document.body, swalClasses['has-input']);
    }

    // inputs
    var inputTypes = ['input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea'];
    var input = void 0;
    for (var _i3 = 0; _i3 < inputTypes.length; _i3++) {
      var inputClass = swalClasses[inputTypes[_i3]];
      var inputContainer = getChildByClass(domCache.content, inputClass);
      input = _this.getInput(inputTypes[_i3]);

      // set attributes
      if (input) {
        for (var j in input.attributes) {
          if (input.attributes.hasOwnProperty(j)) {
            var attrName = input.attributes[j].name;
            if (attrName !== 'type' && attrName !== 'value') {
              input.removeAttribute(attrName);
            }
          }
        }
        for (var attr in innerParams.inputAttributes) {
          input.setAttribute(attr, innerParams.inputAttributes[attr]);
        }
      }

      // set class
      inputContainer.className = inputClass;
      if (innerParams.inputClass) {
        addClass(inputContainer, innerParams.inputClass);
      }

      hide(inputContainer);
    }

    var populateInputOptions = void 0;
    switch (innerParams.input) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
      case 'tel':
      case 'url':
        input = getChildByClass(domCache.content, swalClasses.input);
        input.value = innerParams.inputValue;
        input.placeholder = innerParams.inputPlaceholder;
        input.type = innerParams.input;
        show(input);
        break;
      case 'file':
        input = getChildByClass(domCache.content, swalClasses.file);
        input.placeholder = innerParams.inputPlaceholder;
        input.type = innerParams.input;
        show(input);
        break;
      case 'range':
        var range = getChildByClass(domCache.content, swalClasses.range);
        var rangeInput = range.querySelector('input');
        var rangeOutput = range.querySelector('output');
        rangeInput.value = innerParams.inputValue;
        rangeInput.type = innerParams.input;
        rangeOutput.value = innerParams.inputValue;
        show(range);
        break;
      case 'select':
        var select = getChildByClass(domCache.content, swalClasses.select);
        select.innerHTML = '';
        if (innerParams.inputPlaceholder) {
          var placeholder = document.createElement('option');
          placeholder.innerHTML = innerParams.inputPlaceholder;
          placeholder.value = '';
          placeholder.disabled = true;
          placeholder.selected = true;
          select.appendChild(placeholder);
        }
        populateInputOptions = function populateInputOptions(inputOptions) {
          inputOptions.forEach(function (_ref) {
            var _ref2 = slicedToArray(_ref, 2),
                optionValue = _ref2[0],
                optionLabel = _ref2[1];

            var option = document.createElement('option');
            option.value = optionValue;
            option.innerHTML = optionLabel;
            if (innerParams.inputValue.toString() === optionValue.toString()) {
              option.selected = true;
            }
            select.appendChild(option);
          });
          show(select);
          select.focus();
        };
        break;
      case 'radio':
        var radio = getChildByClass(domCache.content, swalClasses.radio);
        radio.innerHTML = '';
        populateInputOptions = function populateInputOptions(inputOptions) {
          inputOptions.forEach(function (_ref3) {
            var _ref4 = slicedToArray(_ref3, 2),
                radioValue = _ref4[0],
                radioLabel = _ref4[1];

            var radioInput = document.createElement('input');
            var radioLabelElement = document.createElement('label');
            radioInput.type = 'radio';
            radioInput.name = swalClasses.radio;
            radioInput.value = radioValue;
            if (innerParams.inputValue.toString() === radioValue.toString()) {
              radioInput.checked = true;
            }
            radioLabelElement.innerHTML = radioLabel;
            radioLabelElement.insertBefore(radioInput, radioLabelElement.firstChild);
            radio.appendChild(radioLabelElement);
          });
          show(radio);
          var radios = radio.querySelectorAll('input');
          if (radios.length) {
            radios[0].focus();
          }
        };
        break;
      case 'checkbox':
        var checkbox = getChildByClass(domCache.content, swalClasses.checkbox);
        var checkboxInput = _this.getInput('checkbox');
        checkboxInput.type = 'checkbox';
        checkboxInput.value = 1;
        checkboxInput.id = swalClasses.checkbox;
        checkboxInput.checked = Boolean(innerParams.inputValue);
        var label = checkbox.getElementsByTagName('span');
        if (label.length) {
          checkbox.removeChild(label[0]);
        }
        label = document.createElement('span');
        label.innerHTML = innerParams.inputPlaceholder;
        checkbox.appendChild(label);
        show(checkbox);
        break;
      case 'textarea':
        var textarea = getChildByClass(domCache.content, swalClasses.textarea);
        textarea.value = innerParams.inputValue;
        textarea.placeholder = innerParams.inputPlaceholder;
        show(textarea);
        break;
      case null:
        break;
      default:
        error('Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "' + innerParams.input + '"');
        break;
    }

    if (innerParams.input === 'select' || innerParams.input === 'radio') {
      var processInputOptions = function processInputOptions(inputOptions) {
        return populateInputOptions(formatInputOptions(inputOptions));
      };
      if (isThenable(innerParams.inputOptions)) {
        constructor.showLoading();
        innerParams.inputOptions.then(function (inputOptions) {
          _this.hideLoading();
          processInputOptions(inputOptions);
        });
      } else if (_typeof(innerParams.inputOptions) === 'object') {
        processInputOptions(innerParams.inputOptions);
      } else {
        error('Unexpected type of inputOptions! Expected object, Map or Promise, got ' + _typeof(innerParams.inputOptions));
      }
    } else if (['text', 'email', 'number', 'tel', 'textarea'].indexOf(innerParams.input) !== -1 && isThenable(innerParams.inputValue)) {
      constructor.showLoading();
      hide(input);
      innerParams.inputValue.then(function (inputValue) {
        input.value = innerParams.input === 'number' ? parseFloat(inputValue) || 0 : inputValue + '';
        show(input);
        _this.hideLoading();
      }).catch(function (err) {
        error('Error in inputValue promise: ' + err);
        input.value = '';
        show(input);
        _this.hideLoading();
      });
    }

    openPopup(innerParams);

    if (!innerParams.toast) {
      if (!callIfFunction(innerParams.allowEnterKey)) {
        if (document.activeElement) {
          document.activeElement.blur();
        }
      } else if (innerParams.focusCancel && isVisible(domCache.cancelButton)) {
        domCache.cancelButton.focus();
      } else if (innerParams.focusConfirm && isVisible(domCache.confirmButton)) {
        domCache.confirmButton.focus();
      } else {
        setFocus(-1, 1);
      }
    }

    // fix scroll
    domCache.container.scrollTop = 0;
  });
}



var instanceMethods = Object.freeze({
	hideLoading: hideLoading,
	disableLoading: hideLoading,
	getInput: getInput,
	enableButtons: enableButtons,
	disableButtons: disableButtons,
	enableConfirmButton: enableConfirmButton,
	disableConfirmButton: disableConfirmButton,
	enableInput: enableInput,
	disableInput: disableInput,
	showValidationError: showValidationError,
	resetValidationError: resetValidationError,
	_main: _main
});

var currentInstance = void 0;

// SweetAlert constructor
function SweetAlert() {
  // Prevent run in Node env
  if (typeof window === 'undefined') {
    return;
  }

  // Check for the existence of Promise
  if (typeof Promise === 'undefined') {
    error('This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/sweetalert2/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)');
  }

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (typeof args[0] === 'undefined') {
    error('SweetAlert2 expects at least 1 attribute!');
    return false;
  }

  currentInstance = this;

  var outerParams = Object.freeze(this.constructor.argsToParams(args));

  Object.defineProperties(this, {
    params: {
      value: outerParams,
      writable: false,
      enumerable: true
    }
  });

  var promise = this._main(this.params);
  privateProps.promise.set(this, promise);
}

// `catch` cannot be the name of a module export, so we define our thenable methods here instead
SweetAlert.prototype.then = function (onFulfilled, onRejected) {
  var promise = privateProps.promise.get(this);
  return promise.then(onFulfilled, onRejected);
};
SweetAlert.prototype.catch = function (onRejected) {
  var promise = privateProps.promise.get(this);
  return promise.catch(onRejected);
};
SweetAlert.prototype.finally = function (onFinally) {
  var promise = privateProps.promise.get(this);
  return promise.finally(onFinally);
};

// Assign instance methods from src/instanceMethods/*.js to prototype
_extends(SweetAlert.prototype, instanceMethods);

// Assign static methods from src/staticMethods/*.js to constructor
_extends(SweetAlert, staticMethods);

// Proxy to instance methods to constructor, for now, for backwards compatibility
Object.keys(instanceMethods).forEach(function (key) {
  SweetAlert[key] = function () {
    if (currentInstance) {
      var _currentInstance;

      return (_currentInstance = currentInstance)[key].apply(_currentInstance, arguments);
    }
  };
});

SweetAlert.DismissReason = DismissReason;

SweetAlert.noop = function () {};

SweetAlert.version = version;

var Swal = withNoNewKeyword(withGlobalDefaults(SweetAlert));
Swal.default = Swal;

return Swal;

})));
if (typeof window !== 'undefined' && window.Sweetalert2){  window.swal = window.sweetAlert = window.Swal = window.SweetAlert = window.Sweetalert2}

"undefined"!=typeof document&&function(e,t){var n=e.createElement("style");if(e.getElementsByTagName("head")[0].appendChild(n),n.styleSheet)n.styleSheet.disabled||(n.styleSheet.cssText=t);else try{n.innerHTML=t}catch(e){n.innerText=t}}(document,"@-webkit-keyframes swal2-show {\n" +
"  0% {\n" +
"    -webkit-transform: scale(0.7);\n" +
"            transform: scale(0.7); }\n" +
"  45% {\n" +
"    -webkit-transform: scale(1.05);\n" +
"            transform: scale(1.05); }\n" +
"  80% {\n" +
"    -webkit-transform: scale(0.95);\n" +
"            transform: scale(0.95); }\n" +
"  100% {\n" +
"    -webkit-transform: scale(1);\n" +
"            transform: scale(1); } }\n" +
"\n" +
"@keyframes swal2-show {\n" +
"  0% {\n" +
"    -webkit-transform: scale(0.7);\n" +
"            transform: scale(0.7); }\n" +
"  45% {\n" +
"    -webkit-transform: scale(1.05);\n" +
"            transform: scale(1.05); }\n" +
"  80% {\n" +
"    -webkit-transform: scale(0.95);\n" +
"            transform: scale(0.95); }\n" +
"  100% {\n" +
"    -webkit-transform: scale(1);\n" +
"            transform: scale(1); } }\n" +
"\n" +
"@-webkit-keyframes swal2-hide {\n" +
"  0% {\n" +
"    -webkit-transform: scale(1);\n" +
"            transform: scale(1);\n" +
"    opacity: 1; }\n" +
"  100% {\n" +
"    -webkit-transform: scale(0.5);\n" +
"            transform: scale(0.5);\n" +
"    opacity: 0; } }\n" +
"\n" +
"@keyframes swal2-hide {\n" +
"  0% {\n" +
"    -webkit-transform: scale(1);\n" +
"            transform: scale(1);\n" +
"    opacity: 1; }\n" +
"  100% {\n" +
"    -webkit-transform: scale(0.5);\n" +
"            transform: scale(0.5);\n" +
"    opacity: 0; } }\n" +
"\n" +
"@-webkit-keyframes swal2-animate-success-line-tip {\n" +
"  0% {\n" +
"    top: 1.1875em;\n" +
"    left: .0625em;\n" +
"    width: 0; }\n" +
"  54% {\n" +
"    top: 1.0625em;\n" +
"    left: .125em;\n" +
"    width: 0; }\n" +
"  70% {\n" +
"    top: 2.1875em;\n" +
"    left: -.375em;\n" +
"    width: 3.125em; }\n" +
"  84% {\n" +
"    top: 3em;\n" +
"    left: 1.3125em;\n" +
"    width: 1.0625em; }\n" +
"  100% {\n" +
"    top: 2.8125em;\n" +
"    left: .875em;\n" +
"    width: 1.5625em; } }\n" +
"\n" +
"@keyframes swal2-animate-success-line-tip {\n" +
"  0% {\n" +
"    top: 1.1875em;\n" +
"    left: .0625em;\n" +
"    width: 0; }\n" +
"  54% {\n" +
"    top: 1.0625em;\n" +
"    left: .125em;\n" +
"    width: 0; }\n" +
"  70% {\n" +
"    top: 2.1875em;\n" +
"    left: -.375em;\n" +
"    width: 3.125em; }\n" +
"  84% {\n" +
"    top: 3em;\n" +
"    left: 1.3125em;\n" +
"    width: 1.0625em; }\n" +
"  100% {\n" +
"    top: 2.8125em;\n" +
"    left: .875em;\n" +
"    width: 1.5625em; } }\n" +
"\n" +
"@-webkit-keyframes swal2-animate-success-line-long {\n" +
"  0% {\n" +
"    top: 3.375em;\n" +
"    right: 2.875em;\n" +
"    width: 0; }\n" +
"  65% {\n" +
"    top: 3.375em;\n" +
"    right: 2.875em;\n" +
"    width: 0; }\n" +
"  84% {\n" +
"    top: 2.1875em;\n" +
"    right: 0;\n" +
"    width: 3.4375em; }\n" +
"  100% {\n" +
"    top: 2.375em;\n" +
"    right: .5em;\n" +
"    width: 2.9375em; } }\n" +
"\n" +
"@keyframes swal2-animate-success-line-long {\n" +
"  0% {\n" +
"    top: 3.375em;\n" +
"    right: 2.875em;\n" +
"    width: 0; }\n" +
"  65% {\n" +
"    top: 3.375em;\n" +
"    right: 2.875em;\n" +
"    width: 0; }\n" +
"  84% {\n" +
"    top: 2.1875em;\n" +
"    right: 0;\n" +
"    width: 3.4375em; }\n" +
"  100% {\n" +
"    top: 2.375em;\n" +
"    right: .5em;\n" +
"    width: 2.9375em; } }\n" +
"\n" +
"@-webkit-keyframes swal2-rotate-success-circular-line {\n" +
"  0% {\n" +
"    -webkit-transform: rotate(-45deg);\n" +
"            transform: rotate(-45deg); }\n" +
"  5% {\n" +
"    -webkit-transform: rotate(-45deg);\n" +
"            transform: rotate(-45deg); }\n" +
"  12% {\n" +
"    -webkit-transform: rotate(-405deg);\n" +
"            transform: rotate(-405deg); }\n" +
"  100% {\n" +
"    -webkit-transform: rotate(-405deg);\n" +
"            transform: rotate(-405deg); } }\n" +
"\n" +
"@keyframes swal2-rotate-success-circular-line {\n" +
"  0% {\n" +
"    -webkit-transform: rotate(-45deg);\n" +
"            transform: rotate(-45deg); }\n" +
"  5% {\n" +
"    -webkit-transform: rotate(-45deg);\n" +
"            transform: rotate(-45deg); }\n" +
"  12% {\n" +
"    -webkit-transform: rotate(-405deg);\n" +
"            transform: rotate(-405deg); }\n" +
"  100% {\n" +
"    -webkit-transform: rotate(-405deg);\n" +
"            transform: rotate(-405deg); } }\n" +
"\n" +
"@-webkit-keyframes swal2-animate-error-x-mark {\n" +
"  0% {\n" +
"    margin-top: 1.625em;\n" +
"    -webkit-transform: scale(0.4);\n" +
"            transform: scale(0.4);\n" +
"    opacity: 0; }\n" +
"  50% {\n" +
"    margin-top: 1.625em;\n" +
"    -webkit-transform: scale(0.4);\n" +
"            transform: scale(0.4);\n" +
"    opacity: 0; }\n" +
"  80% {\n" +
"    margin-top: -.375em;\n" +
"    -webkit-transform: scale(1.15);\n" +
"            transform: scale(1.15); }\n" +
"  100% {\n" +
"    margin-top: 0;\n" +
"    -webkit-transform: scale(1);\n" +
"            transform: scale(1);\n" +
"    opacity: 1; } }\n" +
"\n" +
"@keyframes swal2-animate-error-x-mark {\n" +
"  0% {\n" +
"    margin-top: 1.625em;\n" +
"    -webkit-transform: scale(0.4);\n" +
"            transform: scale(0.4);\n" +
"    opacity: 0; }\n" +
"  50% {\n" +
"    margin-top: 1.625em;\n" +
"    -webkit-transform: scale(0.4);\n" +
"            transform: scale(0.4);\n" +
"    opacity: 0; }\n" +
"  80% {\n" +
"    margin-top: -.375em;\n" +
"    -webkit-transform: scale(1.15);\n" +
"            transform: scale(1.15); }\n" +
"  100% {\n" +
"    margin-top: 0;\n" +
"    -webkit-transform: scale(1);\n" +
"            transform: scale(1);\n" +
"    opacity: 1; } }\n" +
"\n" +
"@-webkit-keyframes swal2-animate-error-icon {\n" +
"  0% {\n" +
"    -webkit-transform: rotateX(100deg);\n" +
"            transform: rotateX(100deg);\n" +
"    opacity: 0; }\n" +
"  100% {\n" +
"    -webkit-transform: rotateX(0deg);\n" +
"            transform: rotateX(0deg);\n" +
"    opacity: 1; } }\n" +
"\n" +
"@keyframes swal2-animate-error-icon {\n" +
"  0% {\n" +
"    -webkit-transform: rotateX(100deg);\n" +
"            transform: rotateX(100deg);\n" +
"    opacity: 0; }\n" +
"  100% {\n" +
"    -webkit-transform: rotateX(0deg);\n" +
"            transform: rotateX(0deg);\n" +
"    opacity: 1; } }\n" +
"\n" +
"body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast {\n" +
"  flex-direction: column;\n" +
"  align-items: stretch; }\n" +
"  body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-actions {\n" +
"    flex: 1;\n" +
"    align-self: stretch;\n" +
"    justify-content: flex-end;\n" +
"    height: 2.2em; }\n" +
"  body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-loading {\n" +
"    justify-content: center; }\n" +
"  body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-input {\n" +
"    height: 2em;\n" +
"    margin: .3125em auto;\n" +
"    font-size: 1em; }\n" +
"  body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-validationerror {\n" +
"    font-size: 1em; }\n" +
"\n" +
"body.swal2-toast-shown > .swal2-container {\n" +
"  position: fixed;\n" +
"  background-color: transparent; }\n" +
"  body.swal2-toast-shown > .swal2-container.swal2-shown {\n" +
"    background-color: transparent; }\n" +
"  body.swal2-toast-shown > .swal2-container.swal2-top {\n" +
"    top: 0;\n" +
"    right: auto;\n" +
"    bottom: auto;\n" +
"    left: 50%;\n" +
"    -webkit-transform: translateX(-50%);\n" +
"            transform: translateX(-50%); }\n" +
"  body.swal2-toast-shown > .swal2-container.swal2-top-end, body.swal2-toast-shown > .swal2-container.swal2-top-right {\n" +
"    top: 0;\n" +
"    right: 0;\n" +
"    bottom: auto;\n" +
"    left: auto; }\n" +
"  body.swal2-toast-shown > .swal2-container.swal2-top-start, body.swal2-toast-shown > .swal2-container.swal2-top-left {\n" +
"    top: 0;\n" +
"    right: auto;\n" +
"    bottom: auto;\n" +
"    left: 0; }\n" +
"  body.swal2-toast-shown > .swal2-container.swal2-center-start, body.swal2-toast-shown > .swal2-container.swal2-center-left {\n" +
"    top: 50%;\n" +
"    right: auto;\n" +
"    bottom: auto;\n" +
"    left: 0;\n" +
"    -webkit-transform: translateY(-50%);\n" +
"            transform: translateY(-50%); }\n" +
"  body.swal2-toast-shown > .swal2-container.swal2-center {\n" +
"    top: 50%;\n" +
"    right: auto;\n" +
"    bottom: auto;\n" +
"    left: 50%;\n" +
"    -webkit-transform: translate(-50%, -50%);\n" +
"            transform: translate(-50%, -50%); }\n" +
"  body.swal2-toast-shown > .swal2-container.swal2-center-end, body.swal2-toast-shown > .swal2-container.swal2-center-right {\n" +
"    top: 50%;\n" +
"    right: 0;\n" +
"    bottom: auto;\n" +
"    left: auto;\n" +
"    -webkit-transform: translateY(-50%);\n" +
"            transform: translateY(-50%); }\n" +
"  body.swal2-toast-shown > .swal2-container.swal2-bottom-start, body.swal2-toast-shown > .swal2-container.swal2-bottom-left {\n" +
"    top: auto;\n" +
"    right: auto;\n" +
"    bottom: 0;\n" +
"    left: 0; }\n" +
"  body.swal2-toast-shown > .swal2-container.swal2-bottom {\n" +
"    top: auto;\n" +
"    right: auto;\n" +
"    bottom: 0;\n" +
"    left: 50%;\n" +
"    -webkit-transform: translateX(-50%);\n" +
"            transform: translateX(-50%); }\n" +
"  body.swal2-toast-shown > .swal2-container.swal2-bottom-end, body.swal2-toast-shown > .swal2-container.swal2-bottom-right {\n" +
"    top: auto;\n" +
"    right: 0;\n" +
"    bottom: 0;\n" +
"    left: auto; }\n" +
"\n" +
".swal2-popup.swal2-toast {\n" +
"  flex-direction: row;\n" +
"  align-items: center;\n" +
"  width: auto;\n" +
"  padding: 0.625em;\n" +
"  box-shadow: 0 0 0.625em #d9d9d9;\n" +
"  overflow-y: hidden; }\n" +
"  .swal2-popup.swal2-toast .swal2-header {\n" +
"    flex-direction: row; }\n" +
"  .swal2-popup.swal2-toast .swal2-title {\n" +
"    justify-content: flex-start;\n" +
"    margin: 0 .6em;\n" +
"    font-size: 1em; }\n" +
"  .swal2-popup.swal2-toast .swal2-close {\n" +
"    position: initial; }\n" +
"  .swal2-popup.swal2-toast .swal2-content {\n" +
"    justify-content: flex-start;\n" +
"    font-size: 1em; }\n" +
"  .swal2-popup.swal2-toast .swal2-icon {\n" +
"    width: 2em;\n" +
"    min-width: 2em;\n" +
"    height: 2em;\n" +
"    margin: 0; }\n" +
"    .swal2-popup.swal2-toast .swal2-icon-text {\n" +
"      font-size: 2em;\n" +
"      font-weight: bold;\n" +
"      line-height: 1em; }\n" +
"    .swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring {\n" +
"      width: 2em;\n" +
"      height: 2em; }\n" +
"    .swal2-popup.swal2-toast .swal2-icon.swal2-error [class^='swal2-x-mark-line'] {\n" +
"      top: .875em;\n" +
"      width: 1.375em; }\n" +
"      .swal2-popup.swal2-toast .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='left'] {\n" +
"        left: .3125em; }\n" +
"      .swal2-popup.swal2-toast .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='right'] {\n" +
"        right: .3125em; }\n" +
"  .swal2-popup.swal2-toast .swal2-actions {\n" +
"    height: auto;\n" +
"    margin: 0 .3125em; }\n" +
"  .swal2-popup.swal2-toast .swal2-styled {\n" +
"    margin: 0 .3125em;\n" +
"    padding: .3125em .625em;\n" +
"    font-size: 1em; }\n" +
"    .swal2-popup.swal2-toast .swal2-styled:focus {\n" +
"      box-shadow: 0 0 0 0.0625em #fff, 0 0 0 0.125em rgba(50, 100, 150, 0.4); }\n" +
"  .swal2-popup.swal2-toast .swal2-success {\n" +
"    border-color: #a5dc86; }\n" +
"    .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-circular-line'] {\n" +
"      position: absolute;\n" +
"      width: 2em;\n" +
"      height: 2.8125em;\n" +
"      -webkit-transform: rotate(45deg);\n" +
"              transform: rotate(45deg);\n" +
"      border-radius: 50%; }\n" +
"      .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-circular-line'][class$='left'] {\n" +
"        top: -.25em;\n" +
"        left: -.9375em;\n" +
"        -webkit-transform: rotate(-45deg);\n" +
"                transform: rotate(-45deg);\n" +
"        -webkit-transform-origin: 2em 2em;\n" +
"                transform-origin: 2em 2em;\n" +
"        border-radius: 4em 0 0 4em; }\n" +
"      .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-circular-line'][class$='right'] {\n" +
"        top: -.25em;\n" +
"        left: .9375em;\n" +
"        -webkit-transform-origin: 0 2em;\n" +
"                transform-origin: 0 2em;\n" +
"        border-radius: 0 4em 4em 0; }\n" +
"    .swal2-popup.swal2-toast .swal2-success .swal2-success-ring {\n" +
"      width: 2em;\n" +
"      height: 2em; }\n" +
"    .swal2-popup.swal2-toast .swal2-success .swal2-success-fix {\n" +
"      top: 0;\n" +
"      left: .4375em;\n" +
"      width: .4375em;\n" +
"      height: 2.6875em; }\n" +
"    .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-line'] {\n" +
"      height: .3125em; }\n" +
"      .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-line'][class$='tip'] {\n" +
"        top: 1.125em;\n" +
"        left: .1875em;\n" +
"        width: .75em; }\n" +
"      .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-line'][class$='long'] {\n" +
"        top: .9375em;\n" +
"        right: .1875em;\n" +
"        width: 1.375em; }\n" +
"  .swal2-popup.swal2-toast.swal2-show {\n" +
"    -webkit-animation: showSweetToast .5s;\n" +
"            animation: showSweetToast .5s; }\n" +
"  .swal2-popup.swal2-toast.swal2-hide {\n" +
"    -webkit-animation: hideSweetToast .2s forwards;\n" +
"            animation: hideSweetToast .2s forwards; }\n" +
"  .swal2-popup.swal2-toast .swal2-animate-success-icon .swal2-success-line-tip {\n" +
"    -webkit-animation: animate-toast-success-tip .75s;\n" +
"            animation: animate-toast-success-tip .75s; }\n" +
"  .swal2-popup.swal2-toast .swal2-animate-success-icon .swal2-success-line-long {\n" +
"    -webkit-animation: animate-toast-success-long .75s;\n" +
"            animation: animate-toast-success-long .75s; }\n" +
"\n" +
"@-webkit-keyframes showSweetToast {\n" +
"  0% {\n" +
"    -webkit-transform: translateY(-0.625em) rotateZ(2deg);\n" +
"            transform: translateY(-0.625em) rotateZ(2deg);\n" +
"    opacity: 0; }\n" +
"  33% {\n" +
"    -webkit-transform: translateY(0) rotateZ(-2deg);\n" +
"            transform: translateY(0) rotateZ(-2deg);\n" +
"    opacity: .5; }\n" +
"  66% {\n" +
"    -webkit-transform: translateY(0.3125em) rotateZ(2deg);\n" +
"            transform: translateY(0.3125em) rotateZ(2deg);\n" +
"    opacity: .7; }\n" +
"  100% {\n" +
"    -webkit-transform: translateY(0) rotateZ(0);\n" +
"            transform: translateY(0) rotateZ(0);\n" +
"    opacity: 1; } }\n" +
"\n" +
"@keyframes showSweetToast {\n" +
"  0% {\n" +
"    -webkit-transform: translateY(-0.625em) rotateZ(2deg);\n" +
"            transform: translateY(-0.625em) rotateZ(2deg);\n" +
"    opacity: 0; }\n" +
"  33% {\n" +
"    -webkit-transform: translateY(0) rotateZ(-2deg);\n" +
"            transform: translateY(0) rotateZ(-2deg);\n" +
"    opacity: .5; }\n" +
"  66% {\n" +
"    -webkit-transform: translateY(0.3125em) rotateZ(2deg);\n" +
"            transform: translateY(0.3125em) rotateZ(2deg);\n" +
"    opacity: .7; }\n" +
"  100% {\n" +
"    -webkit-transform: translateY(0) rotateZ(0);\n" +
"            transform: translateY(0) rotateZ(0);\n" +
"    opacity: 1; } }\n" +
"\n" +
"@-webkit-keyframes hideSweetToast {\n" +
"  0% {\n" +
"    opacity: 1; }\n" +
"  33% {\n" +
"    opacity: .5; }\n" +
"  100% {\n" +
"    -webkit-transform: rotateZ(1deg);\n" +
"            transform: rotateZ(1deg);\n" +
"    opacity: 0; } }\n" +
"\n" +
"@keyframes hideSweetToast {\n" +
"  0% {\n" +
"    opacity: 1; }\n" +
"  33% {\n" +
"    opacity: .5; }\n" +
"  100% {\n" +
"    -webkit-transform: rotateZ(1deg);\n" +
"            transform: rotateZ(1deg);\n" +
"    opacity: 0; } }\n" +
"\n" +
"@-webkit-keyframes animate-toast-success-tip {\n" +
"  0% {\n" +
"    top: .5625em;\n" +
"    left: .0625em;\n" +
"    width: 0; }\n" +
"  54% {\n" +
"    top: .125em;\n" +
"    left: .125em;\n" +
"    width: 0; }\n" +
"  70% {\n" +
"    top: .625em;\n" +
"    left: -.25em;\n" +
"    width: 1.625em; }\n" +
"  84% {\n" +
"    top: 1.0625em;\n" +
"    left: .75em;\n" +
"    width: .5em; }\n" +
"  100% {\n" +
"    top: 1.125em;\n" +
"    left: .1875em;\n" +
"    width: .75em; } }\n" +
"\n" +
"@keyframes animate-toast-success-tip {\n" +
"  0% {\n" +
"    top: .5625em;\n" +
"    left: .0625em;\n" +
"    width: 0; }\n" +
"  54% {\n" +
"    top: .125em;\n" +
"    left: .125em;\n" +
"    width: 0; }\n" +
"  70% {\n" +
"    top: .625em;\n" +
"    left: -.25em;\n" +
"    width: 1.625em; }\n" +
"  84% {\n" +
"    top: 1.0625em;\n" +
"    left: .75em;\n" +
"    width: .5em; }\n" +
"  100% {\n" +
"    top: 1.125em;\n" +
"    left: .1875em;\n" +
"    width: .75em; } }\n" +
"\n" +
"@-webkit-keyframes animate-toast-success-long {\n" +
"  0% {\n" +
"    top: 1.625em;\n" +
"    right: 1.375em;\n" +
"    width: 0; }\n" +
"  65% {\n" +
"    top: 1.25em;\n" +
"    right: .9375em;\n" +
"    width: 0; }\n" +
"  84% {\n" +
"    top: .9375em;\n" +
"    right: 0;\n" +
"    width: 1.125em; }\n" +
"  100% {\n" +
"    top: .9375em;\n" +
"    right: .1875em;\n" +
"    width: 1.375em; } }\n" +
"\n" +
"@keyframes animate-toast-success-long {\n" +
"  0% {\n" +
"    top: 1.625em;\n" +
"    right: 1.375em;\n" +
"    width: 0; }\n" +
"  65% {\n" +
"    top: 1.25em;\n" +
"    right: .9375em;\n" +
"    width: 0; }\n" +
"  84% {\n" +
"    top: .9375em;\n" +
"    right: 0;\n" +
"    width: 1.125em; }\n" +
"  100% {\n" +
"    top: .9375em;\n" +
"    right: .1875em;\n" +
"    width: 1.375em; } }\n" +
"\n" +
"body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) {\n" +
"  overflow-y: hidden; }\n" +
"\n" +
"body.swal2-height-auto {\n" +
"  height: auto !important; }\n" +
"\n" +
"body.swal2-no-backdrop .swal2-shown {\n" +
"  top: auto;\n" +
"  right: auto;\n" +
"  bottom: auto;\n" +
"  left: auto;\n" +
"  background-color: transparent; }\n" +
"  body.swal2-no-backdrop .swal2-shown > .swal2-modal {\n" +
"    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4); }\n" +
"  body.swal2-no-backdrop .swal2-shown.swal2-top {\n" +
"    top: 0;\n" +
"    left: 50%;\n" +
"    -webkit-transform: translateX(-50%);\n" +
"            transform: translateX(-50%); }\n" +
"  body.swal2-no-backdrop .swal2-shown.swal2-top-start, body.swal2-no-backdrop .swal2-shown.swal2-top-left {\n" +
"    top: 0;\n" +
"    left: 0; }\n" +
"  body.swal2-no-backdrop .swal2-shown.swal2-top-end, body.swal2-no-backdrop .swal2-shown.swal2-top-right {\n" +
"    top: 0;\n" +
"    right: 0; }\n" +
"  body.swal2-no-backdrop .swal2-shown.swal2-center {\n" +
"    top: 50%;\n" +
"    left: 50%;\n" +
"    -webkit-transform: translate(-50%, -50%);\n" +
"            transform: translate(-50%, -50%); }\n" +
"  body.swal2-no-backdrop .swal2-shown.swal2-center-start, body.swal2-no-backdrop .swal2-shown.swal2-center-left {\n" +
"    top: 50%;\n" +
"    left: 0;\n" +
"    -webkit-transform: translateY(-50%);\n" +
"            transform: translateY(-50%); }\n" +
"  body.swal2-no-backdrop .swal2-shown.swal2-center-end, body.swal2-no-backdrop .swal2-shown.swal2-center-right {\n" +
"    top: 50%;\n" +
"    right: 0;\n" +
"    -webkit-transform: translateY(-50%);\n" +
"            transform: translateY(-50%); }\n" +
"  body.swal2-no-backdrop .swal2-shown.swal2-bottom {\n" +
"    bottom: 0;\n" +
"    left: 50%;\n" +
"    -webkit-transform: translateX(-50%);\n" +
"            transform: translateX(-50%); }\n" +
"  body.swal2-no-backdrop .swal2-shown.swal2-bottom-start, body.swal2-no-backdrop .swal2-shown.swal2-bottom-left {\n" +
"    bottom: 0;\n" +
"    left: 0; }\n" +
"  body.swal2-no-backdrop .swal2-shown.swal2-bottom-end, body.swal2-no-backdrop .swal2-shown.swal2-bottom-right {\n" +
"    right: 0;\n" +
"    bottom: 0; }\n" +
"\n" +
".swal2-container {\n" +
"  display: flex;\n" +
"  position: fixed;\n" +
"  top: 0;\n" +
"  right: 0;\n" +
"  bottom: 0;\n" +
"  left: 0;\n" +
"  flex-direction: row;\n" +
"  align-items: center;\n" +
"  justify-content: center;\n" +
"  padding: 10px;\n" +
"  background-color: transparent;\n" +
"  z-index: 1060;\n" +
"  overflow-x: hidden;\n" +
"  -webkit-overflow-scrolling: touch; }\n" +
"  .swal2-container.swal2-top {\n" +
"    align-items: flex-start; }\n" +
"  .swal2-container.swal2-top-start, .swal2-container.swal2-top-left {\n" +
"    align-items: flex-start;\n" +
"    justify-content: flex-start; }\n" +
"  .swal2-container.swal2-top-end, .swal2-container.swal2-top-right {\n" +
"    align-items: flex-start;\n" +
"    justify-content: flex-end; }\n" +
"  .swal2-container.swal2-center {\n" +
"    align-items: center; }\n" +
"  .swal2-container.swal2-center-start, .swal2-container.swal2-center-left {\n" +
"    align-items: center;\n" +
"    justify-content: flex-start; }\n" +
"  .swal2-container.swal2-center-end, .swal2-container.swal2-center-right {\n" +
"    align-items: center;\n" +
"    justify-content: flex-end; }\n" +
"  .swal2-container.swal2-bottom {\n" +
"    align-items: flex-end; }\n" +
"  .swal2-container.swal2-bottom-start, .swal2-container.swal2-bottom-left {\n" +
"    align-items: flex-end;\n" +
"    justify-content: flex-start; }\n" +
"  .swal2-container.swal2-bottom-end, .swal2-container.swal2-bottom-right {\n" +
"    align-items: flex-end;\n" +
"    justify-content: flex-end; }\n" +
"  .swal2-container.swal2-grow-fullscreen > .swal2-modal {\n" +
"    display: flex !important;\n" +
"    flex: 1;\n" +
"    align-self: stretch;\n" +
"    justify-content: center; }\n" +
"  .swal2-container.swal2-grow-row > .swal2-modal {\n" +
"    display: flex !important;\n" +
"    flex: 1;\n" +
"    align-content: center;\n" +
"    justify-content: center; }\n" +
"  .swal2-container.swal2-grow-column {\n" +
"    flex: 1;\n" +
"    flex-direction: column; }\n" +
"    .swal2-container.swal2-grow-column.swal2-top, .swal2-container.swal2-grow-column.swal2-center, .swal2-container.swal2-grow-column.swal2-bottom {\n" +
"      align-items: center; }\n" +
"    .swal2-container.swal2-grow-column.swal2-top-start, .swal2-container.swal2-grow-column.swal2-center-start, .swal2-container.swal2-grow-column.swal2-bottom-start, .swal2-container.swal2-grow-column.swal2-top-left, .swal2-container.swal2-grow-column.swal2-center-left, .swal2-container.swal2-grow-column.swal2-bottom-left {\n" +
"      align-items: flex-start; }\n" +
"    .swal2-container.swal2-grow-column.swal2-top-end, .swal2-container.swal2-grow-column.swal2-center-end, .swal2-container.swal2-grow-column.swal2-bottom-end, .swal2-container.swal2-grow-column.swal2-top-right, .swal2-container.swal2-grow-column.swal2-center-right, .swal2-container.swal2-grow-column.swal2-bottom-right {\n" +
"      align-items: flex-end; }\n" +
"    .swal2-container.swal2-grow-column > .swal2-modal {\n" +
"      display: flex !important;\n" +
"      flex: 1;\n" +
"      align-content: center;\n" +
"      justify-content: center; }\n" +
"  .swal2-container:not(.swal2-top):not(.swal2-top-start):not(.swal2-top-end):not(.swal2-top-left):not(.swal2-top-right):not(.swal2-center-start):not(.swal2-center-end):not(.swal2-center-left):not(.swal2-center-right):not(.swal2-bottom):not(.swal2-bottom-start):not(.swal2-bottom-end):not(.swal2-bottom-left):not(.swal2-bottom-right) > .swal2-modal {\n" +
"    margin: auto; }\n" +
"  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n" +
"    .swal2-container .swal2-modal {\n" +
"      margin: 0 !important; } }\n" +
"  .swal2-container.swal2-fade {\n" +
"    transition: background-color .1s; }\n" +
"  .swal2-container.swal2-shown {\n" +
"    background-color: rgba(0, 0, 0, 0.4); }\n" +
"\n" +
".swal2-popup {\n" +
"  display: none;\n" +
"  position: relative;\n" +
"  flex-direction: column;\n" +
"  justify-content: center;\n" +
"  width: 32em;\n" +
"  max-width: 100%;\n" +
"  padding: 1.25em;\n" +
"  border-radius: 0.3125em;\n" +
"  background: #fff;\n" +
"  font-family: inherit;\n" +
"  font-size: 1rem;\n" +
"  box-sizing: border-box; }\n" +
"  .swal2-popup:focus {\n" +
"    outline: none; }\n" +
"  .swal2-popup.swal2-loading {\n" +
"    overflow-y: hidden; }\n" +
"  .swal2-popup .swal2-header {\n" +
"    display: flex;\n" +
"    flex-direction: column;\n" +
"    align-items: center; }\n" +
"  .swal2-popup .swal2-title {\n" +
"    display: block;\n" +
"    position: relative;\n" +
"    max-width: 100%;\n" +
"    margin: 0 0 0.4em;\n" +
"    padding: 0;\n" +
"    color: #595959;\n" +
"    font-size: 1.875em;\n" +
"    font-weight: 600;\n" +
"    text-align: center;\n" +
"    text-transform: none;\n" +
"    word-wrap: break-word; }\n" +
"  .swal2-popup .swal2-actions {\n" +
"    align-items: center;\n" +
"    justify-content: center;\n" +
"    margin: 1.25em auto 0; }\n" +
"    .swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled[disabled] {\n" +
"      opacity: .4; }\n" +
"    .swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled:hover {\n" +
"      background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)); }\n" +
"    .swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled:active {\n" +
"      background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)); }\n" +
"    .swal2-popup .swal2-actions.swal2-loading .swal2-styled.swal2-confirm {\n" +
"      width: 2.5em;\n" +
"      height: 2.5em;\n" +
"      margin: .46875em;\n" +
"      padding: 0;\n" +
"      border: .25em solid transparent;\n" +
"      border-radius: 100%;\n" +
"      border-color: transparent;\n" +
"      background-color: transparent !important;\n" +
"      color: transparent;\n" +
"      cursor: default;\n" +
"      box-sizing: border-box;\n" +
"      -webkit-animation: swal2-rotate-loading 1.5s linear 0s infinite normal;\n" +
"              animation: swal2-rotate-loading 1.5s linear 0s infinite normal;\n" +
"      -webkit-user-select: none;\n" +
"         -moz-user-select: none;\n" +
"          -ms-user-select: none;\n" +
"              user-select: none; }\n" +
"    .swal2-popup .swal2-actions.swal2-loading .swal2-styled.swal2-cancel {\n" +
"      margin-right: 30px;\n" +
"      margin-left: 30px; }\n" +
"    .swal2-popup .swal2-actions.swal2-loading :not(.swal2-styled).swal2-confirm::after {\n" +
"      display: inline-block;\n" +
"      width: 15px;\n" +
"      height: 15px;\n" +
"      margin-left: 5px;\n" +
"      border: 3px solid #999999;\n" +
"      border-radius: 50%;\n" +
"      border-right-color: transparent;\n" +
"      box-shadow: 1px 1px 1px #fff;\n" +
"      content: '';\n" +
"      -webkit-animation: swal2-rotate-loading 1.5s linear 0s infinite normal;\n" +
"              animation: swal2-rotate-loading 1.5s linear 0s infinite normal; }\n" +
"  .swal2-popup .swal2-styled {\n" +
"    margin: 0 .3125em;\n" +
"    padding: .625em 2em;\n" +
"    font-weight: 500;\n" +
"    box-shadow: none; }\n" +
"    .swal2-popup .swal2-styled:not([disabled]) {\n" +
"      cursor: pointer; }\n" +
"    .swal2-popup .swal2-styled.swal2-confirm {\n" +
"      border: 0;\n" +
"      border-radius: 0.25em;\n" +
"      background: initial;\n" +
"      background-color: #3085d6;\n" +
"      color: #fff;\n" +
"      font-size: 1.0625em; }\n" +
"    .swal2-popup .swal2-styled.swal2-cancel {\n" +
"      border: 0;\n" +
"      border-radius: 0.25em;\n" +
"      background: initial;\n" +
"      background-color: #aaa;\n" +
"      color: #fff;\n" +
"      font-size: 1.0625em; }\n" +
"    .swal2-popup .swal2-styled:focus {\n" +
"      outline: none;\n" +
"      box-shadow: 0 0 0 2px #fff, 0 0 0 4px rgba(50, 100, 150, 0.4); }\n" +
"    .swal2-popup .swal2-styled::-moz-focus-inner {\n" +
"      border: 0; }\n" +
"  .swal2-popup .swal2-footer {\n" +
"    justify-content: center;\n" +
"    margin: 1.25em 0 0;\n" +
"    padding-top: 1em;\n" +
"    border-top: 1px solid #eee;\n" +
"    color: #545454;\n" +
"    font-size: 1em; }\n" +
"  .swal2-popup .swal2-image {\n" +
"    max-width: 100%;\n" +
"    margin: 1.25em auto; }\n" +
"  .swal2-popup .swal2-close {\n" +
"    position: absolute;\n" +
"    top: 0;\n" +
"    right: 0;\n" +
"    justify-content: center;\n" +
"    width: 1.2em;\n" +
"    height: 1.2em;\n" +
"    padding: 0;\n" +
"    transition: color 0.1s ease-out;\n" +
"    border: none;\n" +
"    border-radius: 0;\n" +
"    background: transparent;\n" +
"    color: #cccccc;\n" +
"    font-family: serif;\n" +
"    font-size: 2.5em;\n" +
"    line-height: 1.2;\n" +
"    cursor: pointer;\n" +
"    overflow: hidden; }\n" +
"    .swal2-popup .swal2-close:hover {\n" +
"      -webkit-transform: none;\n" +
"              transform: none;\n" +
"      color: #f27474; }\n" +
"  .swal2-popup > .swal2-input,\n" +
"  .swal2-popup > .swal2-file,\n" +
"  .swal2-popup > .swal2-textarea,\n" +
"  .swal2-popup > .swal2-select,\n" +
"  .swal2-popup > .swal2-radio,\n" +
"  .swal2-popup > .swal2-checkbox {\n" +
"    display: none; }\n" +
"  .swal2-popup .swal2-content {\n" +
"    justify-content: center;\n" +
"    margin: 0;\n" +
"    padding: 0;\n" +
"    color: #545454;\n" +
"    font-size: 1.125em;\n" +
"    font-weight: 300;\n" +
"    line-height: normal;\n" +
"    word-wrap: break-word; }\n" +
"  .swal2-popup #swal2-content {\n" +
"    text-align: center; }\n" +
"  .swal2-popup .swal2-input,\n" +
"  .swal2-popup .swal2-file,\n" +
"  .swal2-popup .swal2-textarea,\n" +
"  .swal2-popup .swal2-select,\n" +
"  .swal2-popup .swal2-radio,\n" +
"  .swal2-popup .swal2-checkbox {\n" +
"    margin: 1em auto; }\n" +
"  .swal2-popup .swal2-input,\n" +
"  .swal2-popup .swal2-file,\n" +
"  .swal2-popup .swal2-textarea {\n" +
"    width: 100%;\n" +
"    transition: border-color .3s, box-shadow .3s;\n" +
"    border: 1px solid #d9d9d9;\n" +
"    border-radius: 0.1875em;\n" +
"    font-size: 1.125em;\n" +
"    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06);\n" +
"    box-sizing: border-box; }\n" +
"    .swal2-popup .swal2-input.swal2-inputerror,\n" +
"    .swal2-popup .swal2-file.swal2-inputerror,\n" +
"    .swal2-popup .swal2-textarea.swal2-inputerror {\n" +
"      border-color: #f27474 !important;\n" +
"      box-shadow: 0 0 2px #f27474 !important; }\n" +
"    .swal2-popup .swal2-input:focus,\n" +
"    .swal2-popup .swal2-file:focus,\n" +
"    .swal2-popup .swal2-textarea:focus {\n" +
"      border: 1px solid #b4dbed;\n" +
"      outline: none;\n" +
"      box-shadow: 0 0 3px #c4e6f5; }\n" +
"    .swal2-popup .swal2-input::-webkit-input-placeholder,\n" +
"    .swal2-popup .swal2-file::-webkit-input-placeholder,\n" +
"    .swal2-popup .swal2-textarea::-webkit-input-placeholder {\n" +
"      color: #cccccc; }\n" +
"    .swal2-popup .swal2-input:-ms-input-placeholder,\n" +
"    .swal2-popup .swal2-file:-ms-input-placeholder,\n" +
"    .swal2-popup .swal2-textarea:-ms-input-placeholder {\n" +
"      color: #cccccc; }\n" +
"    .swal2-popup .swal2-input::-ms-input-placeholder,\n" +
"    .swal2-popup .swal2-file::-ms-input-placeholder,\n" +
"    .swal2-popup .swal2-textarea::-ms-input-placeholder {\n" +
"      color: #cccccc; }\n" +
"    .swal2-popup .swal2-input::placeholder,\n" +
"    .swal2-popup .swal2-file::placeholder,\n" +
"    .swal2-popup .swal2-textarea::placeholder {\n" +
"      color: #cccccc; }\n" +
"  .swal2-popup .swal2-range input {\n" +
"    width: 80%; }\n" +
"  .swal2-popup .swal2-range output {\n" +
"    width: 20%;\n" +
"    font-weight: 600;\n" +
"    text-align: center; }\n" +
"  .swal2-popup .swal2-range input,\n" +
"  .swal2-popup .swal2-range output {\n" +
"    height: 2.625em;\n" +
"    margin: 1em auto;\n" +
"    padding: 0;\n" +
"    font-size: 1.125em;\n" +
"    line-height: 2.625em; }\n" +
"  .swal2-popup .swal2-input {\n" +
"    height: 2.625em;\n" +
"    padding: 0.75em; }\n" +
"    .swal2-popup .swal2-input[type='number'] {\n" +
"      max-width: 10em; }\n" +
"  .swal2-popup .swal2-file {\n" +
"    font-size: 1.125em; }\n" +
"  .swal2-popup .swal2-textarea {\n" +
"    height: 6.75em;\n" +
"    padding: 0.75em; }\n" +
"  .swal2-popup .swal2-select {\n" +
"    min-width: 50%;\n" +
"    max-width: 100%;\n" +
"    padding: .375em .625em;\n" +
"    color: #545454;\n" +
"    font-size: 1.125em; }\n" +
"  .swal2-popup .swal2-radio,\n" +
"  .swal2-popup .swal2-checkbox {\n" +
"    align-items: center;\n" +
"    justify-content: center; }\n" +
"    .swal2-popup .swal2-radio label,\n" +
"    .swal2-popup .swal2-checkbox label {\n" +
"      margin: 0 .6em;\n" +
"      font-size: 1.125em; }\n" +
"    .swal2-popup .swal2-radio input,\n" +
"    .swal2-popup .swal2-checkbox input {\n" +
"      margin: 0 .4em; }\n" +
"  .swal2-popup .swal2-validationerror {\n" +
"    display: none;\n" +
"    align-items: center;\n" +
"    justify-content: center;\n" +
"    padding: 0.625em;\n" +
"    background: #f0f0f0;\n" +
"    color: #666666;\n" +
"    font-size: 1em;\n" +
"    font-weight: 300;\n" +
"    overflow: hidden; }\n" +
"    .swal2-popup .swal2-validationerror::before {\n" +
"      display: inline-block;\n" +
"      width: 1.5em;\n" +
"      min-width: 1.5em;\n" +
"      height: 1.5em;\n" +
"      margin: 0 .625em;\n" +
"      border-radius: 50%;\n" +
"      background-color: #f27474;\n" +
"      color: #fff;\n" +
"      font-weight: 600;\n" +
"      line-height: 1.5em;\n" +
"      text-align: center;\n" +
"      content: '!';\n" +
"      zoom: normal; }\n" +
"\n" +
"@supports (-ms-accelerator: true) {\n" +
"  .swal2-range input {\n" +
"    width: 100% !important; }\n" +
"  .swal2-range output {\n" +
"    display: none; } }\n" +
"\n" +
"@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n" +
"  .swal2-range input {\n" +
"    width: 100% !important; }\n" +
"  .swal2-range output {\n" +
"    display: none; } }\n" +
"\n" +
"@-moz-document url-prefix() {\n" +
"  .swal2-close:focus {\n" +
"    outline: 2px solid rgba(50, 100, 150, 0.4); } }\n" +
"\n" +
".swal2-icon {\n" +
"  position: relative;\n" +
"  justify-content: center;\n" +
"  width: 5em;\n" +
"  height: 5em;\n" +
"  margin: 1.25em auto 1.875em;\n" +
"  border: .25em solid transparent;\n" +
"  border-radius: 50%;\n" +
"  line-height: 5em;\n" +
"  cursor: default;\n" +
"  box-sizing: content-box;\n" +
"  -webkit-user-select: none;\n" +
"     -moz-user-select: none;\n" +
"      -ms-user-select: none;\n" +
"          user-select: none;\n" +
"  zoom: normal; }\n" +
"  .swal2-icon-text {\n" +
"    font-size: 3.75em; }\n" +
"  .swal2-icon.swal2-error {\n" +
"    border-color: #f27474; }\n" +
"    .swal2-icon.swal2-error .swal2-x-mark {\n" +
"      position: relative;\n" +
"      flex-grow: 1; }\n" +
"    .swal2-icon.swal2-error [class^='swal2-x-mark-line'] {\n" +
"      display: block;\n" +
"      position: absolute;\n" +
"      top: 2.3125em;\n" +
"      width: 2.9375em;\n" +
"      height: .3125em;\n" +
"      border-radius: .125em;\n" +
"      background-color: #f27474; }\n" +
"      .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='left'] {\n" +
"        left: 1.0625em;\n" +
"        -webkit-transform: rotate(45deg);\n" +
"                transform: rotate(45deg); }\n" +
"      .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='right'] {\n" +
"        right: 1em;\n" +
"        -webkit-transform: rotate(-45deg);\n" +
"                transform: rotate(-45deg); }\n" +
"  .swal2-icon.swal2-warning {\n" +
"    border-color: #facea8;\n" +
"    color: #f8bb86; }\n" +
"  .swal2-icon.swal2-info {\n" +
"    border-color: #9de0f6;\n" +
"    color: #3fc3ee; }\n" +
"  .swal2-icon.swal2-question {\n" +
"    border-color: #c9dae1;\n" +
"    color: #87adbd; }\n" +
"  .swal2-icon.swal2-success {\n" +
"    border-color: #a5dc86; }\n" +
"    .swal2-icon.swal2-success [class^='swal2-success-circular-line'] {\n" +
"      position: absolute;\n" +
"      width: 3.75em;\n" +
"      height: 7.5em;\n" +
"      -webkit-transform: rotate(45deg);\n" +
"              transform: rotate(45deg);\n" +
"      border-radius: 50%; }\n" +
"      .swal2-icon.swal2-success [class^='swal2-success-circular-line'][class$='left'] {\n" +
"        top: -.4375em;\n" +
"        left: -2.0635em;\n" +
"        -webkit-transform: rotate(-45deg);\n" +
"                transform: rotate(-45deg);\n" +
"        -webkit-transform-origin: 3.75em 3.75em;\n" +
"                transform-origin: 3.75em 3.75em;\n" +
"        border-radius: 7.5em 0 0 7.5em; }\n" +
"      .swal2-icon.swal2-success [class^='swal2-success-circular-line'][class$='right'] {\n" +
"        top: -.6875em;\n" +
"        left: 1.875em;\n" +
"        -webkit-transform: rotate(-45deg);\n" +
"                transform: rotate(-45deg);\n" +
"        -webkit-transform-origin: 0 3.75em;\n" +
"                transform-origin: 0 3.75em;\n" +
"        border-radius: 0 7.5em 7.5em 0; }\n" +
"    .swal2-icon.swal2-success .swal2-success-ring {\n" +
"      position: absolute;\n" +
"      top: -.25em;\n" +
"      left: -.25em;\n" +
"      width: 100%;\n" +
"      height: 100%;\n" +
"      border: 0.25em solid rgba(165, 220, 134, 0.3);\n" +
"      border-radius: 50%;\n" +
"      z-index: 2;\n" +
"      box-sizing: content-box; }\n" +
"    .swal2-icon.swal2-success .swal2-success-fix {\n" +
"      position: absolute;\n" +
"      top: .5em;\n" +
"      left: 1.625em;\n" +
"      width: .4375em;\n" +
"      height: 5.625em;\n" +
"      -webkit-transform: rotate(-45deg);\n" +
"              transform: rotate(-45deg);\n" +
"      z-index: 1; }\n" +
"    .swal2-icon.swal2-success [class^='swal2-success-line'] {\n" +
"      display: block;\n" +
"      position: absolute;\n" +
"      height: .3125em;\n" +
"      border-radius: .125em;\n" +
"      background-color: #a5dc86;\n" +
"      z-index: 2; }\n" +
"      .swal2-icon.swal2-success [class^='swal2-success-line'][class$='tip'] {\n" +
"        top: 2.875em;\n" +
"        left: .875em;\n" +
"        width: 1.5625em;\n" +
"        -webkit-transform: rotate(45deg);\n" +
"                transform: rotate(45deg); }\n" +
"      .swal2-icon.swal2-success [class^='swal2-success-line'][class$='long'] {\n" +
"        top: 2.375em;\n" +
"        right: .5em;\n" +
"        width: 2.9375em;\n" +
"        -webkit-transform: rotate(-45deg);\n" +
"                transform: rotate(-45deg); }\n" +
"\n" +
".swal2-progresssteps {\n" +
"  align-items: center;\n" +
"  margin: 0 0 1.25em;\n" +
"  padding: 0;\n" +
"  font-weight: 600; }\n" +
"  .swal2-progresssteps li {\n" +
"    display: inline-block;\n" +
"    position: relative; }\n" +
"  .swal2-progresssteps .swal2-progresscircle {\n" +
"    width: 2em;\n" +
"    height: 2em;\n" +
"    border-radius: 2em;\n" +
"    background: #3085d6;\n" +
"    color: #fff;\n" +
"    line-height: 2em;\n" +
"    text-align: center;\n" +
"    z-index: 20; }\n" +
"    .swal2-progresssteps .swal2-progresscircle:first-child {\n" +
"      margin-left: 0; }\n" +
"    .swal2-progresssteps .swal2-progresscircle:last-child {\n" +
"      margin-right: 0; }\n" +
"    .swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep {\n" +
"      background: #3085d6; }\n" +
"      .swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep ~ .swal2-progresscircle {\n" +
"        background: #add8e6; }\n" +
"      .swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep ~ .swal2-progressline {\n" +
"        background: #add8e6; }\n" +
"  .swal2-progresssteps .swal2-progressline {\n" +
"    width: 2.5em;\n" +
"    height: .4em;\n" +
"    margin: 0 -1px;\n" +
"    background: #3085d6;\n" +
"    z-index: 10; }\n" +
"\n" +
"[class^='swal2'] {\n" +
"  -webkit-tap-highlight-color: transparent; }\n" +
"\n" +
".swal2-show {\n" +
"  -webkit-animation: swal2-show 0.3s;\n" +
"          animation: swal2-show 0.3s; }\n" +
"  .swal2-show.swal2-noanimation {\n" +
"    -webkit-animation: none;\n" +
"            animation: none; }\n" +
"\n" +
".swal2-hide {\n" +
"  -webkit-animation: swal2-hide 0.15s forwards;\n" +
"          animation: swal2-hide 0.15s forwards; }\n" +
"  .swal2-hide.swal2-noanimation {\n" +
"    -webkit-animation: none;\n" +
"            animation: none; }\n" +
"\n" +
"[dir='rtl'] .swal2-close {\n" +
"  right: auto;\n" +
"  left: 0; }\n" +
"\n" +
".swal2-animate-success-icon .swal2-success-line-tip {\n" +
"  -webkit-animation: swal2-animate-success-line-tip 0.75s;\n" +
"          animation: swal2-animate-success-line-tip 0.75s; }\n" +
"\n" +
".swal2-animate-success-icon .swal2-success-line-long {\n" +
"  -webkit-animation: swal2-animate-success-line-long 0.75s;\n" +
"          animation: swal2-animate-success-line-long 0.75s; }\n" +
"\n" +
".swal2-animate-success-icon .swal2-success-circular-line-right {\n" +
"  -webkit-animation: swal2-rotate-success-circular-line 4.25s ease-in;\n" +
"          animation: swal2-rotate-success-circular-line 4.25s ease-in; }\n" +
"\n" +
".swal2-animate-error-icon {\n" +
"  -webkit-animation: swal2-animate-error-icon 0.5s;\n" +
"          animation: swal2-animate-error-icon 0.5s; }\n" +
"  .swal2-animate-error-icon .swal2-x-mark {\n" +
"    -webkit-animation: swal2-animate-error-x-mark 0.5s;\n" +
"            animation: swal2-animate-error-x-mark 0.5s; }\n" +
"\n" +
"@-webkit-keyframes swal2-rotate-loading {\n" +
"  0% {\n" +
"    -webkit-transform: rotate(0deg);\n" +
"            transform: rotate(0deg); }\n" +
"  100% {\n" +
"    -webkit-transform: rotate(360deg);\n" +
"            transform: rotate(360deg); } }\n" +
"\n" +
"@keyframes swal2-rotate-loading {\n" +
"  0% {\n" +
"    -webkit-transform: rotate(0deg);\n" +
"            transform: rotate(0deg); }\n" +
"  100% {\n" +
"    -webkit-transform: rotate(360deg);\n" +
"            transform: rotate(360deg); } }");
},{}],6:[function(require,module,exports){
/*
 * validate.js 2.0.1
 * Copyright (c) 2011 - 2015 Rick Harrison, http://rickharrison.me
 * validate.js is open sourced under the MIT license.
 * Portions of validate.js are inspired by CodeIgniter.
 * http://rickharrison.github.com/validate.js
 */

(function(window, document, undefined) {
    /*
     * If you would like an application-wide config, change these defaults.
     * Otherwise, use the setMessage() function to configure form specific messages.
     */

    var defaults = {
        messages: {
            required: 'The %s field is required.',
            matches: 'The %s field does not match the %s field.',
            "default": 'The %s field is still set to default, please change.',
            valid_email: 'The %s field must contain a valid email address.',
            valid_emails: 'The %s field must contain all valid email addresses.',
            min_length: 'The %s field must be at least %s characters in length.',
            max_length: 'The %s field must not exceed %s characters in length.',
            exact_length: 'The %s field must be exactly %s characters in length.',
            greater_than: 'The %s field must contain a number greater than %s.',
            less_than: 'The %s field must contain a number less than %s.',
            alpha: 'The %s field must only contain alphabetical characters.',
            alpha_numeric: 'The %s field must only contain alpha-numeric characters.',
            alpha_dash: 'The %s field must only contain alpha-numeric characters, underscores, and dashes.',
            numeric: 'The %s field must contain only numbers.',
            integer: 'The %s field must contain an integer.',
            decimal: 'The %s field must contain a decimal number.',
            is_natural: 'The %s field must contain only positive numbers.',
            is_natural_no_zero: 'The %s field must contain a number greater than zero.',
            valid_ip: 'The %s field must contain a valid IP.',
            valid_base64: 'The %s field must contain a base64 string.',
            valid_credit_card: 'The %s field must contain a valid credit card number.',
            is_file_type: 'The %s field must contain only %s files.',
            valid_url: 'The %s field must contain a valid URL.',
            greater_than_date: 'The %s field must contain a more recent date than %s.',
            less_than_date: 'The %s field must contain an older date than %s.',
            greater_than_or_equal_date: 'The %s field must contain a date that\'s at least as recent as %s.',
            less_than_or_equal_date: 'The %s field must contain a date that\'s %s or older.'
        },
        callback: function(errors) {

        }
    };

    /*
     * Define the regular expressions that will be used
     */

    var ruleRegex = /^(.+?)\[(.+)\]$/,
        numericRegex = /^[0-9]+$/,
        integerRegex = /^\-?[0-9]+$/,
        decimalRegex = /^\-?[0-9]*\.?[0-9]+$/,
        emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        alphaRegex = /^[a-z]+$/i,
        alphaNumericRegex = /^[a-z0-9]+$/i,
        alphaDashRegex = /^[a-z0-9_\-]+$/i,
        naturalRegex = /^[0-9]+$/i,
        naturalNoZeroRegex = /^[1-9][0-9]*$/i,
        ipRegex = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,
        base64Regex = /[^a-zA-Z0-9\/\+=]/i,
        numericDashRegex = /^[\d\-\s]+$/,
        urlRegex = /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
        dateRegex = /\d{4}-\d{1,2}-\d{1,2}/;

    /*
     * The exposed public object to validate a form:
     *
     * @param formNameOrNode - String - The name attribute of the form (i.e. <form name="myForm"></form>) or node of the form element
     * @param fields - Array - [{
     *     name: The name of the element (i.e. <input name="myField" />)
     *     display: 'Field Name'
     *     rules: required|matches[password_confirm]
     * }]
     * @param callback - Function - The callback after validation has been performed.
     *     @argument errors - An array of validation errors
     *     @argument event - The javascript event
     */

    var FormValidator = function(formNameOrNode, fields, callback) {
        this.callback = callback || defaults.callback;
        this.errors = [];
        this.fields = {};
        this.form = this._formByNameOrNode(formNameOrNode) || {};
        this.messages = {};
        this.handlers = {};
        this.conditionals = {};

        for (var i = 0, fieldLength = fields.length; i < fieldLength; i++) {
            var field = fields[i];

            // If passed in incorrectly, we need to skip the field.
            if ((!field.name && !field.names) || !field.rules) {
                console.warn('validate.js: The following field is being skipped due to a misconfiguration:');
                console.warn(field);
                console.warn('Check to ensure you have properly configured a name and rules for this field');
                continue;
            }

            /*
             * Build the master fields array that has all the information needed to validate
             */

            if (field.names) {
                for (var j = 0, fieldNamesLength = field.names.length; j < fieldNamesLength; j++) {
                    this._addField(field, field.names[j]);
                }
            } else {
                this._addField(field, field.name);
            }
        }

        /*
         * Attach an event callback for the form submission
         */

        var _onsubmit = this.form.onsubmit;

        this.form.onsubmit = (function(that) {
            return function(evt) {
                try {
                    return that._validateForm(evt) && (_onsubmit === undefined || _onsubmit());
                } catch(e) {}
            };
        })(this);
    },

    attributeValue = function (element, attributeName) {
        var i;

        if ((element.length > 0) && (element[0].type === 'radio' || element[0].type === 'checkbox')) {
            for (i = 0, elementLength = element.length; i < elementLength; i++) {
                if (element[i].checked) {
                    return element[i][attributeName];
                }
            }

            return;
        }

        return element[attributeName];
    };

    /*
     * @public
     * Sets a custom message for one of the rules
     */

    FormValidator.prototype.setMessage = function(rule, message) {
        this.messages[rule] = message;

        // return this for chaining
        return this;
    };

    /*
     * @public
     * Registers a callback for a custom rule (i.e. callback_username_check)
     */

    FormValidator.prototype.registerCallback = function(name, handler) {
        if (name && typeof name === 'string' && handler && typeof handler === 'function') {
            this.handlers[name] = handler;
        }

        // return this for chaining
        return this;
    };

    /*
     * @public
     * Registers a conditional for a custom 'depends' rule
     */

    FormValidator.prototype.registerConditional = function(name, conditional) {
        if (name && typeof name === 'string' && conditional && typeof conditional === 'function') {
            this.conditionals[name] = conditional;
        }

        // return this for chaining
        return this;
    };

    /*
     * @private
     * Determines if a form dom node was passed in or just a string representing the form name
     */

    FormValidator.prototype._formByNameOrNode = function(formNameOrNode) {
        return (typeof formNameOrNode === 'object') ? formNameOrNode : document.forms[formNameOrNode];
    };

    /*
     * @private
     * Adds a file to the master fields array
     */

    FormValidator.prototype._addField = function(field, nameValue)  {
        this.fields[nameValue] = {
            name: nameValue,
            display: field.display || nameValue,
            rules: field.rules,
            depends: field.depends,
            id: null,
            element: null,
            type: null,
            value: null,
            checked: null
        };
    };

    /*
     * @private
     * Runs the validation when the form is submitted.
     */

    FormValidator.prototype._validateForm = function(evt) {
        this.errors = [];

        for (var key in this.fields) {
            if (this.fields.hasOwnProperty(key)) {
                var field = this.fields[key] || {},
                    element = this.form[field.name];

                if (element && element !== undefined) {
                    field.id = attributeValue(element, 'id');
                    field.element = element;
                    field.type = (element.length > 0) ? element[0].type : element.type;
                    field.value = attributeValue(element, 'value');
                    field.checked = attributeValue(element, 'checked');

                    /*
                     * Run through the rules for each field.
                     * If the field has a depends conditional, only validate the field
                     * if it passes the custom function
                     */

                    if (field.depends && typeof field.depends === "function") {
                        if (field.depends.call(this, field)) {
                            this._validateField(field);
                        }
                    } else if (field.depends && typeof field.depends === "string" && this.conditionals[field.depends]) {
                        if (this.conditionals[field.depends].call(this,field)) {
                            this._validateField(field);
                        }
                    } else {
                        this._validateField(field);
                    }
                }
            }
        }

        if (typeof this.callback === 'function') {
            this.callback(this.errors, evt);
        }

        if (this.errors.length > 0) {
            if (evt && evt.preventDefault) {
                evt.preventDefault();
            } else if (event) {
                // IE uses the global event variable
                event.returnValue = false;
            }
        }

        return true;
    };

    /*
     * @private
     * Looks at the fields value and evaluates it against the given rules
     */

    FormValidator.prototype._validateField = function(field) {
        var i, j,
            rules = field.rules.split('|'),
            indexOfRequired = field.rules.indexOf('required'),
            isEmpty = (!field.value || field.value === '' || field.value === undefined);

        /*
         * Run through the rules and execute the validation methods as needed
         */

        for (i = 0, ruleLength = rules.length; i < ruleLength; i++) {
            var method = rules[i],
                param = null,
                failed = false,
                parts = ruleRegex.exec(method);

            /*
             * If this field is not required and the value is empty, continue on to the next rule unless it's a callback.
             * This ensures that a callback will always be called but other rules will be skipped.
             */

            if (indexOfRequired === -1 && method.indexOf('!callback_') === -1 && isEmpty) {
                continue;
            }

            /*
             * If the rule has a parameter (i.e. matches[param]) split it out
             */

            if (parts) {
                method = parts[1];
                param = parts[2];
            }

            if (method.charAt(0) === '!') {
                method = method.substring(1, method.length);
            }

            /*
             * If the hook is defined, run it to find any validation errors
             */

            if (typeof this._hooks[method] === 'function') {
                if (!this._hooks[method].apply(this, [field, param])) {
                    failed = true;
                }
            } else if (method.substring(0, 9) === 'callback_') {
                // Custom method. Execute the handler if it was registered
                method = method.substring(9, method.length);

                if (typeof this.handlers[method] === 'function') {
                    if (this.handlers[method].apply(this, [field.value, param, field]) === false) {
                        failed = true;
                    }
                }
            }

            /*
             * If the hook failed, add a message to the errors array
             */

            if (failed) {
                // Make sure we have a message for this rule
                var source = this.messages[field.name + '.' + method] || this.messages[method] || defaults.messages[method],
                    message = 'An error has occurred with the ' + field.display + ' field.';

                if (source) {
                    message = source.replace('%s', field.display);

                    if (param) {
                        message = message.replace('%s', (this.fields[param]) ? this.fields[param].display : param);
                    }
                }

                var existingError;
                for (j = 0; j < this.errors.length; j += 1) {
                    if (field.id === this.errors[j].id) {
                        existingError = this.errors[j];
                    }
                }

                var errorObject = existingError || {
                    id: field.id,
                    display: field.display,
                    element: field.element,
                    name: field.name,
                    message: message,
                    messages: [],
                    rule: method
                };
                errorObject.messages.push(message);
                if (!existingError) this.errors.push(errorObject);
            }
        }
    };

    /**
     * private function _getValidDate: helper function to convert a string date to a Date object
     * @param date (String) must be in format yyyy-mm-dd or use keyword: today
     * @returns {Date} returns false if invalid
     */
    FormValidator.prototype._getValidDate = function(date) {
        if (!date.match('today') && !date.match(dateRegex)) {
            return false;
        }

        var validDate = new Date(),
            validDateArray;

        if (!date.match('today')) {
            validDateArray = date.split('-');
            validDate.setFullYear(validDateArray[0]);
            validDate.setMonth(validDateArray[1] - 1);
            validDate.setDate(validDateArray[2]);
        }
        return validDate;
    };

    /*
     * @private
     * Object containing all of the validation hooks
     */

    FormValidator.prototype._hooks = {
        required: function(field) {
            var value = field.value;

            if ((field.type === 'checkbox') || (field.type === 'radio')) {
                return (field.checked === true);
            }

            return (value !== null && value !== '');
        },

        "default": function(field, defaultName){
            return field.value !== defaultName;
        },

        matches: function(field, matchName) {
            var el = this.form[matchName];

            if (el) {
                return field.value === el.value;
            }

            return false;
        },

        valid_email: function(field) {
            return emailRegex.test(field.value);
        },

        valid_emails: function(field) {
            var result = field.value.split(/\s*,\s*/g);

            for (var i = 0, resultLength = result.length; i < resultLength; i++) {
                if (!emailRegex.test(result[i])) {
                    return false;
                }
            }

            return true;
        },

        min_length: function(field, length) {
            if (!numericRegex.test(length)) {
                return false;
            }

            return (field.value.length >= parseInt(length, 10));
        },

        max_length: function(field, length) {
            if (!numericRegex.test(length)) {
                return false;
            }

            return (field.value.length <= parseInt(length, 10));
        },

        exact_length: function(field, length) {
            if (!numericRegex.test(length)) {
                return false;
            }

            return (field.value.length === parseInt(length, 10));
        },

        greater_than: function(field, param) {
            if (!decimalRegex.test(field.value)) {
                return false;
            }

            return (parseFloat(field.value) > parseFloat(param));
        },

        less_than: function(field, param) {
            if (!decimalRegex.test(field.value)) {
                return false;
            }

            return (parseFloat(field.value) < parseFloat(param));
        },

        alpha: function(field) {
            return (alphaRegex.test(field.value));
        },

        alpha_numeric: function(field) {
            return (alphaNumericRegex.test(field.value));
        },

        alpha_dash: function(field) {
            return (alphaDashRegex.test(field.value));
        },

        numeric: function(field) {
            return (numericRegex.test(field.value));
        },

        integer: function(field) {
            return (integerRegex.test(field.value));
        },

        decimal: function(field) {
            return (decimalRegex.test(field.value));
        },

        is_natural: function(field) {
            return (naturalRegex.test(field.value));
        },

        is_natural_no_zero: function(field) {
            return (naturalNoZeroRegex.test(field.value));
        },

        valid_ip: function(field) {
            return (ipRegex.test(field.value));
        },

        valid_base64: function(field) {
            return (base64Regex.test(field.value));
        },

        valid_url: function(field) {
            return (urlRegex.test(field.value));
        },

        valid_credit_card: function(field){
            // Luhn Check Code from https://gist.github.com/4075533
            // accept only digits, dashes or spaces
            if (!numericDashRegex.test(field.value)) return false;

            // The Luhn Algorithm. It's so pretty.
            var nCheck = 0, nDigit = 0, bEven = false;
            var strippedField = field.value.replace(/\D/g, "");

            for (var n = strippedField.length - 1; n >= 0; n--) {
                var cDigit = strippedField.charAt(n);
                nDigit = parseInt(cDigit, 10);
                if (bEven) {
                    if ((nDigit *= 2) > 9) nDigit -= 9;
                }

                nCheck += nDigit;
                bEven = !bEven;
            }

            return (nCheck % 10) === 0;
        },

        is_file_type: function(field,type) {
            if (field.type !== 'file') {
                return true;
            }

            var ext = field.value.substr((field.value.lastIndexOf('.') + 1)),
                typeArray = type.split(','),
                inArray = false,
                i = 0,
                len = typeArray.length;

            for (i; i < len; i++) {
                if (ext.toUpperCase() == typeArray[i].toUpperCase()) inArray = true;
            }

            return inArray;
        },

        greater_than_date: function (field, date) {
            var enteredDate = this._getValidDate(field.value),
                validDate = this._getValidDate(date);

            if (!validDate || !enteredDate) {
                return false;
            }

            return enteredDate > validDate;
        },

        less_than_date: function (field, date) {
            var enteredDate = this._getValidDate(field.value),
                validDate = this._getValidDate(date);

            if (!validDate || !enteredDate) {
                return false;
            }

            return enteredDate < validDate;
        },

        greater_than_or_equal_date: function (field, date) {
            var enteredDate = this._getValidDate(field.value),
                validDate = this._getValidDate(date);

            if (!validDate || !enteredDate) {
                return false;
            }

            return enteredDate >= validDate;
        },

        less_than_or_equal_date: function (field, date) {
            var enteredDate = this._getValidDate(field.value),
                validDate = this._getValidDate(date);

            if (!validDate || !enteredDate) {
                return false;
            }

            return enteredDate <= validDate;
        }
    };

    window.FormValidator = FormValidator;
})(window, document);

/*
 * Export as a CommonJS module
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FormValidator;
}

},{}],7:[function(require,module,exports){
'use strict';

require('./../../../../node_modules/validate-js/validate.js');

var resetPassForm = document.getElementById('reset-password'),
    formElements = void 0; // 'use strict';
//
// export default class Signup {
//   constructor() {
//     this.name = 'signup';
//     console.log('%s module', this.name.toLowerCase());
//   }


if (resetPassForm) {
    formElements = Array.from(resetPassForm.elements);

    formElements.forEach(function (el) {
        el.addEventListener('change', function (event) {
            var target = event.target,
                parent = target.closest('.form-field');

            var validEl = document.createElement('div'),
                span = document.createElement('span');
            validEl.appendChild(span);
            validEl.classList.add('form-field__valid');

            var errorEl = document.createElement('div');
            errorEl.classList.add('form-field__error');

            if (target.id === 'email') {
                var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                if (re.test(target.value)) {
                    deleteErrors();

                    if (!parent.classList.contains('has-valid')) {
                        parent.querySelector('.form-field__wrapper').appendChild(validEl);

                        setTimeout(function () {
                            parent.classList.add('has-valid');
                        }, 50);
                    }
                } else {
                    deleteValids();

                    if (!parent.classList.contains('has-error')) {
                        parent.classList.add('has-error');
                        errorEl.textContent = 'The email field must contain a valid email address.';
                        parent.appendChild(errorEl);
                    }
                }
            }

            function deleteErrors() {
                var errorBlocks = parent.querySelectorAll('.form-field__error');
                errorBlocks.forEach(function (item) {
                    var e = item.closest('.has-error');
                    if (e) {
                        e.classList.remove('has-error');
                    }
                    item.remove();
                });
                parent.classList.remove('has-error');
            }
            function deleteValids() {
                var validBlocks = parent.querySelectorAll('.form-field__valid');
                validBlocks.forEach(function (item) {
                    var v = item.closest('.has-valid');
                    if (v) {
                        v.classList.remove('has-valid');
                    }
                    item.remove();
                });
                parent.classList.remove('has-valid');
            }
        });
    });

    var validator = new FormValidator("reset-password", [{
        name: "fullname",
        // display: 'required',
        rules: "required"
    }, {
        name: "email",
        rules: "required|valid_email"
    }, {
        name: "password",
        rules: "required|min_length[8]|callback_strong_password"
    }, {
        name: "confirm-pass",
        display: "password confirmation",
        rules: "required|matches[password]"
    }, {
        name: "agreement",
        rules: "required"
    }], function (errors, event) {
        var form = event.target;
        // console.dir(form);

        var validBlocks = form.querySelectorAll('.form-field__valid');
        var errorBlocks = form.querySelectorAll('.form-field__error');

        validBlocks.forEach(function (item) {
            var v = item.closest('.has-valid');
            if (v) {
                v.classList.remove('has-valid');
            }
            item.remove();
        });
        errorBlocks.forEach(function (item) {
            var e = item.closest('.has-error');
            if (e) {
                e.classList.remove('has-error');
            }
            item.remove();
        });

        if (errors.length > 0) {
            // Show the errors
            console.log("errors ", errors);

            errors.forEach(function (error) {
                var el = error.element,
                    parent = el.closest('.form-field');

                parent.classList.add('has-error');
                var errorText = document.createElement('div');
                errorText.classList.add('form-field__error');
                errorText.textContent = error.message;
                parent.appendChild(errorText);
            });
        }
    });
    // let message = 'Password must contain ';
    validator.registerCallback('strong_password', function (value) {
        var regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            lcAlpha = /(?=.*[a-z])/,
            ucAlpha = /(?=.*[A-Z])/,
            num = /(?=.*[0-9])/,
            specialChar = /(?=.*[!@#\$%\^&\*])/;

        // if (!lcAlpha.test(value)) {
        //     message += 'at least 1 lowercase alphabetical character, '
        // }
        // if (!ucAlpha.test(value)) {
        //     message += 'at least 1 uppercase alphabetical character, '
        // }
        // if (!num.test(value)) {
        //     message += 'at least 1 lowercase numeric character, '
        // }
        // if (!specialChar.test(value)) {
        //     message += 'at least 1 special character.'
        // }

        if (regexp.test(value)) {
            return true;
        }

        return false;
    })
    // at least 8 characters, at least one special character, at least one capital letter, both letter and number.
    .setMessage('strong_password', 'Password must contain at least 1 lowercase alphabetical character, at least 1 uppercase alphabetical character, at least 1 lowercase numeric character, at least 1 special character.');
    // .setMessage('strong_password', 'Please choose a stronger password using at least 1 number.');
    // }
}

},{"./../../../../node_modules/validate-js/validate.js":6}],8:[function(require,module,exports){
'use strict';

require('./../../../../node_modules/validate-js/validate.js');

var setNewPassForm = document.getElementById('set-new-password'),
    formElements = void 0; // 'use strict';
//
// export default class Signup {
//   constructor() {
//     this.name = 'signup';
//     console.log('%s module', this.name.toLowerCase());
//   }


if (setNewPassForm) {
    formElements = Array.from(setNewPassForm.elements);

    formElements.forEach(function (el) {
        el.addEventListener('change', function (event) {
            var target = event.target,
                parent = target.closest('.form-field');

            var validEl = document.createElement('div'),
                span = document.createElement('span');
            validEl.appendChild(span);
            validEl.classList.add('form-field__valid');

            var errorEl = document.createElement('div');
            errorEl.classList.add('form-field__error');

            if (target.id === 'password') {
                var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
                if (re.test(target.value)) {
                    deleteErrors();

                    if (!parent.classList.contains('has-valid')) {
                        parent.querySelector('.form-field__wrapper').appendChild(validEl);

                        setTimeout(function () {
                            parent.classList.add('has-valid');
                        }, 50);
                    }
                } else {
                    deleteValids();

                    if (!parent.classList.contains('has-error')) {
                        parent.classList.add('has-error');
                        errorEl.textContent = 'Password must contain at least 1 lowercase alphabetical character, at least 1 uppercase alphabetical character, at least 1 lowercase numeric character, at least 1 special character.';
                        parent.appendChild(errorEl);
                    }
                }
            }
            if (target.id === 'confirm-pass') {
                var pass = document.getElementById('password');

                if (pass.value === '') {
                    deleteValids();
                    return;
                }
                if (pass.value === target.value) {
                    deleteErrors();

                    if (!parent.classList.contains('has-valid')) {
                        parent.querySelector('.form-field__wrapper').appendChild(validEl);

                        setTimeout(function () {
                            parent.classList.add('has-valid');
                        }, 50);
                    }
                } else {
                    deleteValids();

                    if (!parent.classList.contains('has-error')) {
                        parent.classList.add('has-error');
                        errorEl.textContent = 'Password has been entered incorrectly';
                        parent.appendChild(errorEl);
                    }
                }
            }

            function deleteErrors() {
                var errorBlocks = parent.querySelectorAll('.form-field__error');
                errorBlocks.forEach(function (item) {
                    var e = item.closest('.has-error');
                    if (e) {
                        e.classList.remove('has-error');
                    }
                    item.remove();
                });
                parent.classList.remove('has-error');
            }
            function deleteValids() {
                var validBlocks = parent.querySelectorAll('.form-field__valid');
                validBlocks.forEach(function (item) {
                    var v = item.closest('.has-valid');
                    if (v) {
                        v.classList.remove('has-valid');
                    }
                    item.remove();
                });
                parent.classList.remove('has-valid');
            }
        });
    });

    var validator = new FormValidator("set-new-password", [{
        name: "fullname",
        // display: 'required',
        rules: "required"
    }, {
        name: "email",
        rules: "required|valid_email"
    }, {
        name: "password",
        rules: "required|min_length[8]|callback_strong_password"
    }, {
        name: "confirm-pass",
        display: "password confirmation",
        rules: "required|matches[password]"
    }, {
        name: "agreement",
        rules: "required"
    }], function (errors, event) {
        var form = event.target;
        // console.dir(form);

        var validBlocks = form.querySelectorAll('.form-field__valid');
        var errorBlocks = form.querySelectorAll('.form-field__error');

        validBlocks.forEach(function (item) {
            var v = item.closest('.has-valid');
            if (v) {
                v.classList.remove('has-valid');
            }
            item.remove();
        });
        errorBlocks.forEach(function (item) {
            var e = item.closest('.has-error');
            if (e) {
                e.classList.remove('has-error');
            }
            item.remove();
        });

        if (errors.length > 0) {
            // Show the errors
            console.log("errors ", errors);

            errors.forEach(function (error) {
                var el = error.element,
                    parent = el.closest('.form-field');

                parent.classList.add('has-error');
                var errorText = document.createElement('div');
                errorText.classList.add('form-field__error');
                errorText.textContent = error.message;
                parent.appendChild(errorText);
            });
        }
    });
    // let message = 'Password must contain ';
    validator.registerCallback('strong_password', function (value) {
        var regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            lcAlpha = /(?=.*[a-z])/,
            ucAlpha = /(?=.*[A-Z])/,
            num = /(?=.*[0-9])/,
            specialChar = /(?=.*[!@#\$%\^&\*])/;

        // if (!lcAlpha.test(value)) {
        //     message += 'at least 1 lowercase alphabetical character, '
        // }
        // if (!ucAlpha.test(value)) {
        //     message += 'at least 1 uppercase alphabetical character, '
        // }
        // if (!num.test(value)) {
        //     message += 'at least 1 lowercase numeric character, '
        // }
        // if (!specialChar.test(value)) {
        //     message += 'at least 1 special character.'
        // }

        if (regexp.test(value)) {
            return true;
        }

        return false;
    })
    // at least 8 characters, at least one special character, at least one capital letter, both letter and number.
    .setMessage('strong_password', 'Password must contain at least 1 lowercase alphabetical character, at least 1 uppercase alphabetical character, at least 1 lowercase numeric character, at least 1 special character.');
    // .setMessage('strong_password', 'Please choose a stronger password using at least 1 number.');
    // }
}

},{"./../../../../node_modules/validate-js/validate.js":6}],9:[function(require,module,exports){
'use strict';

require('./../../../../node_modules/validate-js/validate.js');

var signinForm = document.getElementById('signin'),
    formElements = void 0; // 'use strict';
//
// export default class Signin {
//   constructor() {
//     this.name = 'signin';
//     console.log('%s module', this.name.toLowerCase());
//   }
// }

if (signinForm) {
    formElements = Array.from(signinForm.elements);

    formElements.forEach(function (el) {
        el.addEventListener('change', function (event) {
            var target = event.target,
                parent = target.closest('.form-field');

            var validEl = document.createElement('div'),
                span = document.createElement('span');
            validEl.appendChild(span);
            validEl.classList.add('form-field__valid');

            var errorEl = document.createElement('div');
            errorEl.classList.add('form-field__error');

            if (target.id === 'email') {
                var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                if (re.test(target.value)) {
                    // if (target.value !== '') {
                    deleteErrors();

                    if (!parent.classList.contains('has-valid')) {
                        parent.querySelector('.form-field__wrapper').appendChild(validEl);

                        setTimeout(function () {
                            parent.classList.add('has-valid');
                        }, 50);
                    }
                } else {
                    deleteValids();

                    if (!parent.classList.contains('has-error')) {
                        parent.classList.add('has-error');
                        errorEl.textContent = 'The email field is required.';
                        // errorEl.textContent = 'The email field must contain a valid email address.'
                        parent.appendChild(errorEl);
                    }
                }
            }
            if (target.id === 'password') {
                // let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
                if (target.value !== '') {
                    deleteErrors();

                    if (!parent.classList.contains('has-valid')) {
                        parent.querySelector('.form-field__wrapper').appendChild(validEl);

                        setTimeout(function () {
                            parent.classList.add('has-valid');
                        }, 50);
                    }
                } else {
                    deleteValids();

                    if (!parent.classList.contains('has-error')) {
                        parent.classList.add('has-error');
                        errorEl.textContent = 'The password field is required.';
                        parent.appendChild(errorEl);
                    }
                }
            }

            function deleteErrors() {
                var errorBlocks = parent.querySelectorAll('.form-field__error');
                errorBlocks.forEach(function (item) {
                    var e = item.closest('.has-error');
                    if (e) {
                        e.classList.remove('has-error');
                    }
                    item.remove();
                });
                parent.classList.remove('has-error');
            }
            function deleteValids() {
                var validBlocks = parent.querySelectorAll('.form-field__valid');
                validBlocks.forEach(function (item) {
                    var v = item.closest('.has-valid');
                    if (v) {
                        v.classList.remove('has-valid');
                    }
                    item.remove();
                });
                parent.classList.remove('has-valid');
            }
        });
    });

    var validator = new FormValidator("signin", [{
        name: "fullname",
        // display: 'required',
        rules: "required"
    }, {
        name: "email",
        rules: "required|valid_email"
    }, {
        name: "password",
        rules: "required"
    }], function (errors, event) {
        var form = event.target;
        // console.dir(form);

        var validBlocks = form.querySelectorAll('.form-field__valid');
        var errorBlocks = form.querySelectorAll('.form-field__error');

        validBlocks.forEach(function (item) {
            var v = item.closest('.has-valid');
            if (v) {
                v.classList.remove('has-valid');
            }
            item.remove();
        });
        errorBlocks.forEach(function (item) {
            var e = item.closest('.has-error');
            if (e) {
                e.classList.remove('has-error');
            }
            item.remove();
        });

        if (errors.length > 0) {
            // Show the errors
            console.log("errors ", errors);

            errors.forEach(function (error) {
                var el = error.element,
                    parent = el.closest('.form-field');

                parent.classList.add('has-error');
                var errorText = document.createElement('div');
                errorText.classList.add('form-field__error');
                errorText.textContent = error.message;
                parent.appendChild(errorText);
            });
        }
    });
}

},{"./../../../../node_modules/validate-js/validate.js":6}],10:[function(require,module,exports){
'use strict';

require('./../../../../node_modules/validate-js/validate.js');

var signupForm = document.getElementById('signup'),
    formElements = void 0; // 'use strict';
//
// export default class Signup {
//   constructor() {
//     this.name = 'signup';
//     console.log('%s module', this.name.toLowerCase());
//   }


if (signupForm) {
    formElements = Array.from(signupForm.elements);

    formElements.forEach(function (el) {
        el.addEventListener('change', function (event) {
            var target = event.target,
                parent = target.closest('.form-field');

            var validEl = document.createElement('div'),
                span = document.createElement('span');
            validEl.appendChild(span);
            validEl.classList.add('form-field__valid');

            var errorEl = document.createElement('div');
            errorEl.classList.add('form-field__error');

            if (target.id === 'email') {
                var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                if (re.test(target.value)) {
                    deleteErrors();

                    if (!parent.classList.contains('has-valid')) {
                        parent.querySelector('.form-field__wrapper').appendChild(validEl);

                        setTimeout(function () {
                            parent.classList.add('has-valid');
                        }, 50);
                    }
                } else {
                    deleteValids();

                    if (!parent.classList.contains('has-error')) {
                        parent.classList.add('has-error');
                        errorEl.textContent = 'The email field must contain a valid email address.';
                        parent.appendChild(errorEl);
                    }
                }
            }
            if (target.id === 'password') {
                var _re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
                if (_re.test(target.value)) {
                    deleteErrors();

                    if (!parent.classList.contains('has-valid')) {
                        parent.querySelector('.form-field__wrapper').appendChild(validEl);

                        setTimeout(function () {
                            parent.classList.add('has-valid');
                        }, 50);
                    }
                } else {
                    deleteValids();

                    if (!parent.classList.contains('has-error')) {
                        parent.classList.add('has-error');
                        errorEl.textContent = 'Password must contain at least 1 lowercase alphabetical character, at least 1 uppercase alphabetical character, at least 1 lowercase numeric character, at least 1 special character.';
                        parent.appendChild(errorEl);
                    }
                }
            }
            if (target.id === 'confirm-pass') {
                var pass = document.getElementById('password');

                if (pass.value === '') {
                    deleteValids();
                    return;
                }
                if (pass.value === target.value) {

                    deleteErrors();

                    if (!parent.classList.contains('has-valid')) {
                        parent.querySelector('.form-field__wrapper').appendChild(validEl);

                        setTimeout(function () {
                            parent.classList.add('has-valid');
                        }, 50);
                    }
                } else {
                    deleteValids();

                    if (!parent.classList.contains('has-error')) {
                        parent.classList.add('has-error');
                        errorEl.textContent = 'Password has been entered incorrectly';
                        parent.appendChild(errorEl);
                    }
                }
            }

            function deleteErrors() {
                var errorBlocks = parent.querySelectorAll('.form-field__error');
                errorBlocks.forEach(function (item) {
                    var e = item.closest('.has-error');
                    if (e) {
                        e.classList.remove('has-error');
                    }
                    item.remove();
                });
                parent.classList.remove('has-error');
            }
            function deleteValids() {
                var validBlocks = parent.querySelectorAll('.form-field__valid');
                validBlocks.forEach(function (item) {
                    var v = item.closest('.has-valid');
                    if (v) {
                        v.classList.remove('has-valid');
                    }
                    item.remove();
                });
                parent.classList.remove('has-valid');
            }
        });
    });

    var validator = new FormValidator("signup", [{
        name: "fullname",
        // display: 'required',
        rules: "required"
    }, {
        name: "email",
        rules: "required|valid_email"
    }, {
        name: "password",
        rules: "required|min_length[8]|callback_strong_password"
    }, {
        name: "confirm-pass",
        display: "password confirmation",
        rules: "required|matches[password]"
    }, {
        name: "agreement",
        rules: "required"
    }], function (errors, event) {
        var form = event.target;
        // console.dir(form);

        var validBlocks = form.querySelectorAll('.form-field__valid');
        var errorBlocks = form.querySelectorAll('.form-field__error');

        validBlocks.forEach(function (item) {
            var v = item.closest('.has-valid');
            if (v) {
                v.classList.remove('has-valid');
            }
            item.remove();
        });
        errorBlocks.forEach(function (item) {
            var e = item.closest('.has-error');
            if (e) {
                e.classList.remove('has-error');
            }
            item.remove();
        });

        if (errors.length > 0) {
            // Show the errors
            console.log("errors ", errors);

            errors.forEach(function (error) {
                var el = error.element,
                    parent = el.closest('.form-field');

                parent.classList.add('has-error');
                var errorText = document.createElement('div');
                errorText.classList.add('form-field__error');
                errorText.textContent = error.message;
                parent.appendChild(errorText);
            });
        }
    });
    // let message = 'Password must contain ';
    validator.registerCallback('strong_password', function (value) {
        var regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            lcAlpha = /(?=.*[a-z])/,
            ucAlpha = /(?=.*[A-Z])/,
            num = /(?=.*[0-9])/,
            specialChar = /(?=.*[!@#\$%\^&\*])/;

        // if (!lcAlpha.test(value)) {
        //     message += 'at least 1 lowercase alphabetical character, '
        // }
        // if (!ucAlpha.test(value)) {
        //     message += 'at least 1 uppercase alphabetical character, '
        // }
        // if (!num.test(value)) {
        //     message += 'at least 1 lowercase numeric character, '
        // }
        // if (!specialChar.test(value)) {
        //     message += 'at least 1 special character.'
        // }

        if (regexp.test(value)) {
            return true;
        }

        return false;
    })
    // at least 8 characters, at least one special character, at least one capital letter, both letter and number.
    .setMessage('strong_password', 'Password must contain at least 1 lowercase alphabetical character, at least 1 uppercase alphabetical character, at least 1 lowercase numeric character, at least 1 special character.');
    // .setMessage('strong_password', 'Please choose a stronger password using at least 1 number.');
    // }
}

},{"./../../../../node_modules/validate-js/validate.js":6}],11:[function(require,module,exports){
'use strict';

require('../../_scripts/toCamelCase');

var _randomTo = require('../../_scripts/randomTo');

var _randomTo2 = _interopRequireDefault(_randomTo);

var _tooltip = require('../../_scripts/tooltip');

var _tooltip2 = _interopRequireDefault(_tooltip);

var _sweetalert = require('sweetalert2');

var _sweetalert2 = _interopRequireDefault(_sweetalert);

var _sweetAlertsMixins = require('../../_scripts/sweet-alerts-mixins');

require('./../../../node_modules/validate-js/validate.js');

var _jsMd = require('js-md5');

var _jsMd2 = _interopRequireDefault(_jsMd);

var _clipboard = require('clipboard/dist/clipboard.min');

var _clipboard2 = _interopRequireDefault(_clipboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

$(function () {
    var $body = $('body'),
        collapseItems = Array.from(document.querySelectorAll('.js-toggle-collapse')),
        $flowchart = $('#builder'),
        $wholeBuilderContainer = $flowchart.closest('.сhatbot-builder'),
        $builderButtons = {
        delete: $wholeBuilderContainer.find('.del-component-btn'),
        startingComponent: $wholeBuilderContainer.find('.starting-component-btn'),
        getData: $wholeBuilderContainer.find('.get_data'),
        createComponent: $wholeBuilderContainer.find('.btn-create-component')
    },
        $draggableOperators = $('.draggable_operator'),
        componentTypes = {
        callToAction: 'call_to_action',
        question: 'question',
        answer: 'answer',
        statement: 'statement',
        image: 'image',
        video: 'video',
        link: 'link'
    },
        componentInputs = Array.from(document.querySelectorAll('.flowchart-operator textarea')),
        builderCanvas = document.querySelector('.chatbot-builder__canvas'),
        $container = $flowchart.parent(),
        cx = $flowchart.width() / 2,
        cy = $flowchart.height() / 2,
        colors = ['#4c84ff', '#09d270', '#7977f5', '#febb06', '#ea5391'],
        settingsForms = Array.from(document.forms),

    // numberOfQuestionsInput = document.querySelector('.questions-number'),

    data = {
        // "operators": {
        //     "question_0": {
        //         "properties": {
        //             "title": "Question",
        //             "body": {
        //                 "inputText": {
        //                     "value": "question_0",
        //                     "placeholder": "Input text",
        //                     "limit": 300
        //                 }
        //             },
        //             "inputs": {
        //                 "input_1": {
        //                     "label": "",
        //                     "multiple": true
        //                 }
        //             },
        //             "outputs": {
        //                 "output_1": {
        //                     "label": "",
        //                     "multiple": true
        //                 }
        //             }
        //         },
        //         "left": 120,
        //         "top": 400
        //     },
        //     "answer_0": {
        //         "properties": {
        //             "title": "Answer",
        //             "body": {
        //                 "inputText": {
        //                     "value": "answer_0",
        //                     "placeholder": "Input text",
        //                     "limit": 300
        //                 },
        //                 "id": 1
        //             },
        //             "inputs": {
        //                 "input_1": {
        //                     "label": "",
        //                     "multiple": true
        //                 }
        //             },
        //             "outputs": {
        //                 "output_1": {
        //                     "label": ""
        //                 }
        //             }
        //         },
        //         "left": 440,
        //         "top": 220
        //     },
        //     "answer_1": {
        //         "properties": {
        //             "title": "Answer",
        //             "body": {
        //                 "inputText": {
        //                     "value": "answer_1",
        //                     "placeholder": "Input text",
        //                     "limit": 300
        //                 },
        //                 "id": 1
        //             },
        //             "inputs": {
        //                 "input_1": {
        //                     "label": "",
        //                     "multiple": true
        //                 }
        //             },
        //             "outputs": {
        //                 "output_1": {
        //                     "label": ""
        //                 }
        //             }
        //         },
        //         "left": 460,
        //         "top": 420
        //     },
        //     "question_1": {
        //         "properties": {
        //             "title": "Question",
        //             "body": {
        //                 "inputText": {
        //                     "value": "question_1",
        //                     "placeholder": "Input text",
        //                     "limit": 300
        //                 }
        //             },
        //             "inputs": {
        //                 "input_1": {
        //                     "label": "",
        //                     "multiple": true
        //                 }
        //             },
        //             "outputs": {
        //                 "output_1": {
        //                     "label": "",
        //                     "multiple": true
        //                 }
        //             }
        //         },
        //         "left": 780,
        //         "top": 400
        //     },
        //     "answer_2": {
        //         "properties": {
        //             "title": "Answer",
        //             "body": {
        //                 "inputText": {
        //                     "value": "answer_2",
        //                     "placeholder": "Input text",
        //                     "limit": 300
        //                 },
        //                 "id": 2
        //             },
        //             "inputs": {
        //                 "input_1": {
        //                     "label": "",
        //                     "multiple": true
        //                 }
        //             },
        //             "outputs": {
        //                 "output_1": {
        //                     "label": ""
        //                 }
        //             }
        //         },
        //         "left": 1100,
        //         "top": 400
        //     },
        //     "answer_3": {
        //         "properties": {
        //             "title": "Answer",
        //             "body": {
        //                 "inputText": {
        //                     "value": "answer_3",
        //                     "placeholder": "Input text",
        //                     "limit": 300
        //                 },
        //                 "id": 3
        //             },
        //             "inputs": {
        //                 "input_1": {
        //                     "label": "",
        //                     "multiple": true
        //                 }
        //             },
        //             "outputs": {
        //                 "output_1": {
        //                     "label": ""
        //                 }
        //             }
        //         },
        //         "left": 460,
        //         "top": 660
        //     },
        //     "question_2": {
        //         "properties": {
        //             "title": "Question",
        //             "body": {
        //                 "inputText": {
        //                     "value": "question_2",
        //                     "placeholder": "Input text",
        //                     "limit": 300
        //                 }
        //             },
        //             "inputs": {
        //                 "input_1": {
        //                     "label": "",
        //                     "multiple": true
        //                 }
        //             },
        //             "outputs": {
        //                 "output_1": {
        //                     "label": "",
        //                     "multiple": true
        //                 }
        //             }
        //         },
        //         "left": 800,
        //         "top": 660
        //     },
        //     "answer_4": {
        //         "properties": {
        //             "title": "Answer",
        //             "body": {
        //                 "inputText": {
        //                     "value": "answer_4",
        //                     "placeholder": "Input text",
        //                     "limit": 300
        //                 },
        //                 "id": 4
        //             },
        //             "inputs": {
        //                 "input_1": {
        //                     "label": "",
        //                     "multiple": true
        //                 }
        //             },
        //             "outputs": {
        //                 "output_1": {
        //                     "label": ""
        //                 }
        //             }
        //         },
        //         "left": 1100,
        //         "top": 660
        //     }
        // },
        // "links": {
        //     "0": {
        //         "fromOperator": "question_0",
        //         "fromConnector": "output_1",
        //         "fromSubConnector": 0,
        //         "toOperator": "answer_0",
        //         "toConnector": "input_1",
        //         "toSubConnector": 0,
        //         "color": "#febb06"
        //     },
        //     "1": {
        //         "fromOperator": "answer_0",
        //         "fromConnector": "output_1",
        //         "fromSubConnector": 0,
        //         "toOperator": "question_1",
        //         "toConnector": "input_1",
        //         "toSubConnector": 0,
        //         "color": "#09d270"
        //     },
        //     "2": {
        //         "fromOperator": "question_0",
        //         "fromConnector": "output_1",
        //         "fromSubConnector": 1,
        //         "toOperator": "answer_1",
        //         "toConnector": "input_1",
        //         "toSubConnector": 0,
        //         "color": "#ea5391"
        //     },
        //     "3": {
        //         "fromOperator": "answer_1",
        //         "fromConnector": "output_1",
        //         "fromSubConnector": 0,
        //         "toOperator": "question_1",
        //         "toConnector": "input_1",
        //         "toSubConnector": 1,
        //         "color": "#febb06"
        //     },
        //     "4": {
        //         "fromOperator": "question_1",
        //         "fromConnector": "output_1",
        //         "fromSubConnector": 0,
        //         "toOperator": "answer_2",
        //         "toConnector": "input_1",
        //         "toSubConnector": 0,
        //         "color": "#4c84ff"
        //     },
        //     "5": {
        //         "fromOperator": "question_0",
        //         "fromConnector": "output_1",
        //         "fromSubConnector": 2,
        //         "toOperator": "answer_3",
        //         "toConnector": "input_1",
        //         "toSubConnector": 0,
        //         "color": "#09d270"
        //     },
        //     "6": {
        //         "fromOperator": "answer_3",
        //         "fromConnector": "output_1",
        //         "fromSubConnector": 0,
        //         "toOperator": "question_2",
        //         "toConnector": "input_1",
        //         "toSubConnector": 0,
        //         "color": "#febb06"
        //     },
        //     "7": {
        //         "fromOperator": "question_2",
        //         "fromConnector": "output_1",
        //         "fromSubConnector": 0,
        //         "toOperator": "answer_4",
        //         "toConnector": "input_1",
        //         "toSubConnector": 0,
        //         "color": "#09d270"
        //     }
        // },
        // "operatorTypes": {}

        // "operators": {
        //     "statement_0": {
        //         "properties": {
        //             "title": "Statement",
        //             "body": {
        //                 "inputText": {
        //                     "value": "statement_0",
        //                     "placeholder": "Input text",
        //                     "limit": 300
        //                 }
        //             },
        //             "inputs": {
        //                 "input_1": {
        //                     "label": "",
        //                     "multiple": true
        //                 }
        //             },
        //             "outputs": {
        //                 "output_1": {
        //                     "label": ""
        //                 }
        //             }
        //         },
        //         "left": 520,
        //         "top": 740
        //     },
        //     "question_0": {
        //         "properties": {
        //             "title": "Question",
        //             "body": {
        //                 "inputText": {
        //                     "value": "question_0",
        //                     "placeholder": "Input text",
        //                     "limit": 300
        //                 }
        //             },
        //             "inputs": {
        //                 "input_1": {
        //                     "label": "",
        //                     "multiple": true
        //                 }
        //             },
        //             "outputs": {
        //                 "output_1": {
        //                     "label": "",
        //                     "multiple": true
        //                 }
        //             }
        //         },
        //         "left": 840,
        //         "top": 740
        //     },
        //     "answer_0": {
        //         "properties": {
        //             "title": "Answer",
        //             "body": {
        //                 "inputText": {
        //                     "value": "answer_0",
        //                     "placeholder": "Input text",
        //                     "limit": 300
        //                 },
        //                 "id": 1
        //             },
        //             "inputs": {
        //                 "input_1": {
        //                     "label": "",
        //                     "multiple": true
        //                 }
        //             },
        //             "outputs": {
        //                 "output_1": {
        //                     "label": ""
        //                 }
        //             }
        //         },
        //         "left": 1160,
        //         "top": 640
        //     },
        //     "answer_1": {
        //         "properties": {
        //             "title": "Answer",
        //             "body": {
        //                 "inputText": {
        //                     "value": "answer_1",
        //                     "placeholder": "Input text",
        //                     "limit": 300
        //                 },
        //                 "id": 1
        //             },
        //             "inputs": {
        //                 "input_1": {
        //                     "label": "",
        //                     "multiple": true
        //                 }
        //             },
        //             "outputs": {
        //                 "output_1": {
        //                     "label": ""
        //                 }
        //             }
        //         },
        //         "left": 1160,
        //         "top": 860
        //     }
        // },
        // "links": {
        //     "0": {
        //         "fromOperator": "statement_0",
        //         "fromConnector": "output_1",
        //         "fromSubConnector": 0,
        //         "toOperator": "question_0",
        //         "toConnector": "input_1",
        //         "toSubConnector": 0,
        //         "color": "#4c84ff"
        //     },
        //     "1": {
        //         "fromOperator": "question_0",
        //         "fromConnector": "output_1",
        //         "fromSubConnector": 0,
        //         "toOperator": "answer_0",
        //         "toConnector": "input_1",
        //         "toSubConnector": 0,
        //         "color": "#4c84ff"
        //     },
        //     "2": {
        //         "fromOperator": "question_0",
        //         "fromConnector": "output_1",
        //         "fromSubConnector": 1,
        //         "toOperator": "answer_1",
        //         "toConnector": "input_1",
        //         "toSubConnector": 0,
        //         "color": "#09d270"
        //     }
        // },
        // "operatorTypes": {}
    };

    // manage question outputs in component
    // numberOfQuestionsInput &&
    //     numberOfQuestionsInput.addEventListener('change', function (event) {
    //         let target = event.target,
    //             value = +target.value;
    //
    //         if (value > +target.max) {
    //             value = target.value = target.max;
    //         } else if (value < +target.min) {
    //             value = target.value = target.min;
    //         }
    //         this.closest('.b-builder-component').dataset.nbOutputs = value;
    //     });

    $body.on('input', '.user-input', function () {
        checkComponentInputsLength([this]);
    });
    $body.on('click', '.js-goals-btn', function (e) {
        // e.preventDefault();
        // this.closest('.flowchart-operator-title')
        //     .classList.toggle('is-clicked');
        this.classList.toggle('dropdown-trigger');
    });
    $body.on('click', '.js-goals-list', function (e) {
        e.preventDefault();
        var goalType = e.target.dataset.goalType;
        this.closest('.flowchart-operator').dataset.goal = goalType;
    });
    $body.on('dblclick', '.flowchart-link', function (e) {
        // e.preventDefault();

        $flowchart.flowchart('deleteSelected');
    });

    $body.on('click', '.del-component-btn', function (e) {
        (0, _sweetalert2.default)({
            title: 'Are you sure?',
            text: "",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4c84ff',
            cancelButtonColor: '#f50023',
            confirmButtonText: 'Yes, delete it!'
        }).then(function (result) {
            if (result.value) {
                $flowchart.flowchart('deleteSelected');
            }
        });
    });
    $body.on('click', '.starting-component-btn', function (e) {
        var componentEl = this.closest('.flowchart-operator');
        var startingComponent = componentEl.dataset.startingComponent;

        $('.flowchart-operator').removeClass('is-starting-component');
        $('.flowchart-operator').attr('data-starting-component', 'false');

        componentEl.dataset.startingComponent = "true";
        componentEl.classList.add('is-starting-component');

        // swal({
        //     title: 'Are you sure?',
        //     text: "You won't be able to revert this!",
        //     type: 'warning',
        //     showCancelButton: true,
        //     confirmButtonColor: '#4c84ff',
        //     cancelButtonColor: '#f50023',
        //     confirmButtonText: 'Yes, delete it!'
        // }).then((result) => {
        //     if (result.value) {
        //         $flowchart.flowchart('deleteSelected');
        //     }
        //
        // })
    });

    $body.on('change', 'input[type=file]', uploadFiles);

    // Panzoom initialization...
    var hash = '';
    if ($flowchart.length) {
        var _$draggableOperators$;

        var getOperatorData = function getOperatorData($element) {
            // console.log('elementt', $element);
            var $component = $element.closest('.b-builder-component'),
                componentTitle = $component.find('.b-builder-component__title'),
                componentType = $component.data('component-type'),
                nbInputs = parseInt($component.get(0).dataset.nbInputs),
                nbOutputs = parseInt($component.get(0).dataset.nbOutputs),
                data = {
                properties: {
                    title: componentTitle.text().trim(),
                    body: {
                        inputText: {
                            value: '',
                            placeholder: 'Input text',
                            limit: 300
                        }
                    },
                    inputs: {},
                    outputs: {}
                }
            };

            if (componentType === componentTypes.image) {
                data.properties.body = {
                    inputText: false,
                    image: {
                        url: ''
                    }
                };
            }
            if (componentType === componentTypes.answer) {
                data.properties.body.id = getLastOperatorId(componentType) + 1;
            }

            // if (componentType === 'call_to_action') {
            //     data.properties.body = {
            //         inputText: {
            //             value: 'Some value'
            //         }
            //     };
            // } else if (componentType === 'question') {
            //     data.properties.body = {
            //         inputText: {
            //             value: 'Some value'
            //         }
            //     };
            // } else if (componentType === 'answer') {
            //     data.properties.body = {
            //         inputText: {
            //             value: 'Some value'
            //         }
            //     };
            // } else if (componentType === 'image') {
            //     data.properties.body = {
            //         inputText: false,
            //         image: {
            //             url: '../images/upload1.jpg'
            //         }
            //     };
            // } else if (componentType === 'statement') {
            //     data.properties.body = {
            //         inputText: {
            //             value: 'Some value'
            //         },
            //     };
            // }

            var i = void 0;
            for (i = 1; i <= nbInputs; i++) {
                data.properties.inputs['input_' + i] = { label: '', multiple: true };
            }

            if (componentType === componentTypes.question) {
                for (i = 1; i <= nbOutputs; i++) {
                    data.properties.outputs['output_' + i] = { label: '', multiple: true };
                }
            } else {

                for (i = 1; i <= nbOutputs; i++) {
                    data.properties.outputs['output_' + i] = { label: '' };
                }
            }

            return data;
        };

        var getLastOperatorId = function getLastOperatorId(componentType, data) {
            var operators = [],
                lastId = 0;

            if (data === undefined) {
                data = $flowchart.flowchart('getData');
            }
            // set array from components
            for (var operator in data.operators) {

                if (operator.indexOf(componentType) > -1) {
                    operators.push(operator);
                }
            }

            // set new array from ids
            operators = operators.map(function (oper) {
                oper = oper.split('_');
                return +oper[oper.length - 1];
            });
            operators.sort(function (a, b) {
                return a - b;
            });

            return lastId = operators.length > 0 ? operators[operators.length - 1] : null;
        };

        var activeComponentValidation = function activeComponentValidation(data) {
            data = data || $flowchart.flowchart('getData');
            // let operators = [],
            var components = [];

            $draggableOperators.each(function (i, el) {
                components.push(getComponent(el));
            });
            components.forEach(function (el) {
                if (el.dataset.componentType === componentTypes.answer) {
                    el.dataset.componentDisabled = true;

                    el.querySelector('.icon-hamburger').classList.add('disabled');
                    el.querySelector('button').disabled = true;

                    // if (el.querySelector('input')) {
                    //     el.querySelector('input').disabled = true;
                    // }
                } else {
                    el.dataset.componentDisabled = false;

                    el.querySelector('.icon-hamburger').classList.remove('disabled');
                    el.querySelector('button').disabled = false;
                }
            });
            // console.log('components', components);

            if (data.operators === undefined) {
                data.operators = {};
            }

            for (var operator in data.operators) {

                if (operator.indexOf(componentTypes.question) > -1) {
                    components.forEach(function (el) {
                        if (el.dataset.componentType === componentTypes.answer) {
                            el.dataset.componentDisabled = false;

                            el.querySelector('.icon-hamburger').classList.remove('disabled');
                            el.querySelector('button').disabled = false;
                        }
                    });
                }
            }
            $draggableOperators.draggable({
                cancel: '.disabled'
            });
        };

        var getComponent = function getComponent(dragEl) {
            return dragEl.closest('.b-builder-component');
        };

        var onSaveBuilder = function onSaveBuilder(data, type) {
            var isValid = true;
            var typeText = void 0;

            if (type.toLocaleLowerCase() === 'save') {
                typeText = 'saved';
            } else if (type.toLocaleLowerCase() === 'update') {
                typeText = 'updated';
            } else if (type.toLocaleLowerCase() === 'test') {
                typeText = 'tested';
            }

            try {
                isValid = !validateSettings() ? false : !validateBuilderComponents(data) ? false : validateLinks(data);
                // console.log(isValid);
            } catch (e) {
                isValid = false;
            }

            if (isValid) {
                var setStepsId = function setStepsId(data) {
                    for (var oper in data.operators) {
                        if (data.operators.hasOwnProperty(oper)) {
                            delete data.operators[oper].properties.curStepId;
                            delete data.operators[oper].properties.prevStepId;
                            delete data.operators[oper].properties.nextStepId;

                            if (data.operators[oper].properties.startingComponent === "true") {
                                var isDeleted = false;
                                for (var link in data.links) {
                                    if (data.links.hasOwnProperty(link)) {

                                        if (data.links[link].fromOperator === oper) {

                                            if (!isDeleted) {
                                                if (link !== '0') {
                                                    data.links['0'] = data.links[link];
                                                    delete data.links[link];
                                                }
                                                isDeleted = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    var newLinks = {};
                    var lastLinks = {};
                    var linkId = 1;

                    var toOperator = void 0;
                    for (var _link in data.links) {
                        if (data.links.hasOwnProperty(_link)) {
                            toOperator = data.links[_link].toOperator;
                            if (_link === '0') {
                                newLinks['0'] = data.links[_link];
                                continue;
                            }
                            var amount = Object.keys(newLinks).length;

                            for (var link2 in data.links) {
                                if (data.links.hasOwnProperty(link2)) {
                                    if (data.links[link2].fromOperator === toOperator) {
                                        newLinks[linkId] = data.links[_link];
                                        linkId++;
                                    }
                                }
                            }

                            if (amount === Object.keys(newLinks).length) {
                                lastLinks[Math.random()] = data.links[_link];
                            }
                        }
                    }
                    var newLinksLength = Object.keys(newLinks).length;
                    for (var _link2 in lastLinks) {
                        if (lastLinks.hasOwnProperty(_link2)) {
                            lastLinks[newLinksLength] = lastLinks[_link2];
                            delete lastLinks[_link2];
                            newLinksLength++;
                        }
                    }
                    console.log('newLinks', newLinks);
                    console.log('lastLinks', lastLinks);
                    newLinks = Object.assign({}, newLinks, lastLinks);
                    console.log('newLinks', newLinks);

                    var prevStepId = 0,
                        curStepId = 1,
                        nextStepId = 2;

                    for (var _link3 in newLinks) {
                        if (newLinks.hasOwnProperty(_link3)) {
                            var fromOperator = newLinks[_link3].fromOperator;
                            var _toOperator = newLinks[_link3].toOperator;
                            var fromOperators = [];
                            // let toOperators = [];

                            var isCurStepId = +data.operators[fromOperator].properties.curStepId;
                            if (!isCurStepId) {
                                // continue;

                                data.operators[fromOperator].properties.curStepId = curStepId;

                                curStepId++;
                            }

                            for (var _link4 in newLinks) {
                                if (newLinks.hasOwnProperty(_link4)) {
                                    var linkObj = newLinks[_link4];

                                    if (linkObj.fromOperator.indexOf(fromOperator) > -1) {
                                        if (!data.operators[linkObj.toOperator].properties.curStepId) {
                                            fromOperators.push(linkObj);
                                        }
                                    }
                                    // Check if we have a previous component and set to it nextStepId
                                    // and set to current component prevStepId.
                                    if (linkObj.toOperator.indexOf(fromOperator) > -1) {
                                        var prevComponent = data.operators[linkObj.fromOperator];
                                        var curComponent = data.operators[fromOperator];
                                        curComponent.properties.prevStepId = prevComponent.properties.curStepId;
                                        prevComponent.properties.nextStepId = curComponent.properties.curStepId;
                                    }
                                }
                            }
                            // set to the next component a prevStepId
                            // and set to the current component a nextStepId
                            // let tempCurStepId = curStepId;
                            if (isCurStepId && fromOperators.length) {

                                curStepId++;
                            }
                            fromOperators.forEach(function (link, i, arr) {
                                var isCurStepId2 = +data.operators[link.toOperator].properties.curStepId;
                                if (!isCurStepId2) {
                                    data.operators[link.toOperator].properties.curStepId = curStepId;
                                }
                                data.operators[link.toOperator].properties.prevStepId = data.operators[link.fromOperator].properties.curStepId;
                                data.operators[link.fromOperator].properties.nextStepId = curStepId;
                            });

                            if (!data.operators[fromOperator].properties.prevStepId) {
                                data.operators[fromOperator].properties.prevStepId = 0;
                            }
                            if (!data.operators[_toOperator].properties.nextStepId) {
                                data.operators[_toOperator].properties.nextStepId = 0;
                            }
                        }
                    }
                };

                var componentElements = Array.from(document.querySelectorAll('.flowchart-operator'));
                var operators = data.operators;
                var formData = new FormData();
                var _settingsForms = Array.from(document.forms);
                // for (let form of settingsForms) {
                //     form.onsubmit = (event) => event.preventDefault();
                // }
                // console.log('settingsForms', settingsForms);
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = componentElements[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var c = _step4.value;

                        var id = c.dataset.operatorId;
                        var goalType = c.dataset.goal;
                        var startingComponent = c.dataset.startingComponent;
                        if (goalType !== '') {
                            operators[id].properties.goal = goalType;
                        }
                        if (startingComponent === 'true') {
                            operators[id].properties.startingComponent = startingComponent;
                        }
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }

                setStepsId(data);

                var allFormElements = $flowchart.find('textarea, input'),
                    allFormElementsData = allFormElements.serializeArray();
                // console.log(allFormElementsData);
                allFormElementsData.forEach(function (obj) {
                    var id = obj.name;
                    operators[id].properties.body.inputText.value = obj.value;
                });

                allFormElements.each(function (i, el) {
                    // if (el.type !== 'file') {
                    //     formData.append(el.name, el.value);
                    // } else {
                    //     formData.append(el.name, el.files[0]);
                    // }
                    if (el.type === 'file') {
                        operators[el.name].properties.body.image.url = el.files[0].name;
                        formData.append(el.name, el.files[0]);
                    }
                });

                var chatbotSettings = createObjectFromFormData(_settingsForms);

                // console.log('chatbotSettings', JSON.stringify(chatbotSettings, null, 2));
                // console.log(JSON.stringify(data, null, 2));
                // console.log(formData);
                var host = window.location.host;
                var protocol = window.location.protocol;
                hash = hash ? hash : (0, _jsMd2.default)(Math.random().toString());
                var chatbotScript = '\n                    (function() {\n    function async_load(){\n        var s = document.createElement(\'script\');\n        s.type = \'text/javascript\';\n        var theUrl = \'' + protocol + '//' + host + '/js/chatbots/chatbot-widget.' + hash + '.js\';\n        s.src = theUrl;\n        s.async = true;\n        var fs = document.getElementsByTagName(\'script\')[0];\n        fs.parentNode.insertBefore(s, fs);\n    }\n    window.adboticSettings = {\n        chatbotId: \'' + hash + '\',\n        title: \'' + chatbotSettings.chatbotProperties.botName + '\',\n        avatarUrl: \'https://c-sf.smule.com/sf/s77/arr/3a/5b/fb50ae23-226d-4d55-804f-fd81a6eea8b2.jpg\',\n        base: {\n            width: \'' + chatbotSettings.stylingBase.maxWidth + '\',\n            height: \'' + chatbotSettings.stylingBase.maxHeight + '\',\n            position: \'' + chatbotSettings.stylingBase.position + '\',\n            borderRadius: \'' + chatbotSettings.stylingBase.borderRadius + '\',\n            leftEdge: \'' + chatbotSettings.stylingBase.distanceFromEdge + '\',\n            rightEdge: \'' + chatbotSettings.stylingBase.distanceFromEdge + '\',\n            bottomEdge: \'' + chatbotSettings.stylingBase.distanceFromBottom + '\',\n        },\n        head: {\n            background: \'' + chatbotSettings.stylingHead.background + '\',\n            backgroundColor: \'' + chatbotSettings.stylingHead.backgroundColor + '\',\n            gradientFrom: \'' + chatbotSettings.stylingHead.gradientFrom + '\',\n            gradientTo: \'' + chatbotSettings.stylingHead.gradientTo + '\',\n            fontColor: \'' + chatbotSettings.stylingHead.fontColor + '\'\n        },\n        body: {\n            background: \'' + chatbotSettings.stylingBody.background + '\',\n            backgroundColor: \'' + chatbotSettings.stylingBody.backgroundColor + '\',\n            gradientFrom: \'' + chatbotSettings.stylingBody.gradientFrom + '\',\n            gradientTo: \'' + chatbotSettings.stylingBody.gradientTo + '\'\n        },\n        question: {\n            background: \'' + chatbotSettings.stylingQuestion.background + '\',\n            backgroundColor: \'' + chatbotSettings.stylingQuestion.backgroundColor + '\',\n            gradientFrom: \'' + chatbotSettings.stylingQuestion.gradientFrom + '\',\n            gradientTo: \'' + chatbotSettings.stylingQuestion.gradientTo + '\',\n            fontColor: \'' + chatbotSettings.stylingQuestion.fontColor + '\'\n        },\n        answer: {\n            background: \'' + chatbotSettings.stylingAnswer.background + '\',\n            backgroundColor: \'' + chatbotSettings.stylingAnswer.backgroundColor + '\',\n            gradientFrom: \'' + chatbotSettings.stylingAnswer.gradientFrom + '\',\n            gradientTo: \'' + chatbotSettings.stylingAnswer.gradientTo + '\',\n            fontColor: \'' + chatbotSettings.stylingAnswer.fontColor + '\'\n        },\n        button: {\n            background: \'' + chatbotSettings.stylingButtons.background + '\',\n            backgroundColor: \'' + chatbotSettings.stylingButtons.backgroundColor + '\',\n            gradientFrom: \'' + chatbotSettings.stylingButtons.gradientFrom + '\',\n            gradientTo: \'' + chatbotSettings.stylingButtons.gradientTo + '\',\n            fontColor: \'' + chatbotSettings.stylingButtons.fontColor + '\'\n        }\n    };\n    window.addEventListener ? window.addEventListener(\'load\', async_load, false) : window.attachEvent(\'onload\', async_load);\n})();\n                ';
                // console.log('chatbotScript', chatbotScript);
                var allSettings = {
                    chatbotSettings: chatbotSettings,
                    logicSettings: data,
                    chatbotScript: {
                        filename: 'chatbot-widget.' + hash,
                        script: chatbotScript
                    }
                };
                // console.log('allSettings', JSON.stringify(allSettings));
                console.log('allSettings', allSettings);
                var typeSend = '';
                if (type === 'test') {
                    typeSend = chatbotId ? 'PUT' : 'POST';
                } else {
                    typeSend = type === 'save' ? 'POST' : 'PUT';
                }
                // if (type.toLocaleLowerCase() !== 'test') {
                $.ajax({
                    url: '/api/chatbot',
                    type: typeSend,
                    data: allSettings,
                    success: function success(data) {
                        console.log(data);
                        var script = allSettings.chatbotScript.script.trim();
                        if (type === 'save' && !chatbotId) {
                            hash = data.scriptName.split('.')[1];
                        }
                        if (type === 'save' || type === 'test' && !chatbotId) {
                            hash = allSettings.chatbotScript.filename.split('.')[1];
                            // set chatbot id to data attribute
                            $wholeBuilderContainer.get(0).dataset.chatbotId = data.id;
                            chatbotIdInput.value = data.id;
                            chatbotId = data.id;
                        }
                        // hash = allSettings.chatbotScript.filename.split('.')[1];
                        var text = type === 'save' ? 'saved' : 'updated';
                        if (type !== 'test') {
                            (0, _sweetalert2.default)({
                                type: 'success',
                                title: 'Well done!',
                                text: 'The chatbot has been ' + typeText,
                                showCloseButton: true,
                                showCancelButton: true,
                                confirmButtonColor: '#4c84ff',
                                confirmButtonText: 'Copy code',
                                confirmButtonClass: 'js-clipboard'
                            }).then(function (result) {
                                if (result.value) {
                                    new _clipboard2.default('.js-clipboard', {
                                        text: function text(trigger) {
                                            var res = '<script>' + script + '</script>';
                                            trigger.setAttribute('data-clipboard-text', res);
                                            return trigger.getAttribute('data-clipboard-text');
                                        }
                                    });

                                    (0, _sweetAlertsMixins.toast)({
                                        type: 'success',
                                        title: 'Copied to clipboard!'
                                    });
                                }
                            });
                        }
                    },
                    error: function error(_error2) {
                        console.log(_error2);

                        (0, _sweetalert2.default)({
                            type: 'error',
                            title: 'Oops...',
                            text: _error2.responseText,
                            showCloseButton: true
                        });
                    }
                });
                if (type.toLocaleLowerCase() === 'test') {
                    // const hash = data.chatbotScript.filename.split('.')[1]
                    var botContainer = document.querySelector('.adbotic-chatbot-container');
                    setTimeout(function () {
                        if (botContainer) {
                            botContainer.parentElement.removeChild(botContainer);
                        }
                        var s = document.createElement('script');
                        s.type = 'text/javascript';
                        s.src = protocol + '//' + host + '/js/chatbots/chatbot-widget.' + hash + '.js';
                        // s.src = `./../../js/chatbots/chatbot-widget.${hash}.js`;
                        s.async = true;
                        document.body.appendChild(s);
                    }, 1000);
                    // swal({
                    //     type: 'success',
                    //     title: 'Well done!',
                    //     text: `The chatbot has been ${typeText}`,
                    //     showCloseButton: true,
                    //     showCancelButton: true,
                    //     confirmButtonColor: '#4c84ff',
                    //     confirmButtonText: 'Copy code',
                    //     confirmButtonClass: 'js-clipboard'
                    // }).then((result) => {
                    //     if (result.value) {
                    //         new Clipboard('.js-clipboard', {
                    //             text: function(trigger) {
                    //                 trigger.setAttribute('data-clipboard-text', script);
                    //                 return trigger.getAttribute('data-clipboard-text');
                    //             }
                    //         });
                    //
                    //         swalToast({
                    //             type: 'success',
                    //             title: 'Copied to clipboard!',
                    //         });
                    //     }
                    // });
                }
                // } else {
                // // const hash = allSettings.chatbotScript.filename.split('.')[1];
                // const data = {
                //     chatbot_id: allSettings.chatbotSettings.chatbotProperties.chatbotId
                // };
                // // const hash = allSettings.chatbotScript.filename.split('.')[1];
                // // const data = {
                // //     scriptName: allSettings.chatbotScript.filename
                // // };
                // $.ajax({
                //     url: '/api/get_one_chatbot_by_id',
                //     type: 'GET',
                //     data,
                //     success: function(data) {


                // },
                // error: function(error) {
                //     console.log(error);
                //
                //     swal({
                //         type: 'error',
                //         title: 'Oops...',
                //         text: error.responseText,
                //         showCloseButton: true
                //     });
                // }
                // });
                // $.ajax({
                //     url: '/api/chatbot/script',
                //     type: 'POST',
                //     data,
                //     success: function(data) {
                //
                //         var s = document.createElement('script');
                //         s.type = 'text/javascript';
                //         s.src = `./../../js/chatbots/chatbot-widget.${hash}.js`;
                //         s.async = true;
                //         document.body.appendChild(s);
                //         // swal({
                //         //     type: 'success',
                //         //     title: 'Well done!',
                //         //     text: `The chatbot has been ${typeText}`,
                //         //     showCloseButton: true,
                //         //     showCancelButton: true,
                //         //     confirmButtonColor: '#4c84ff',
                //         //     confirmButtonText: 'Copy code',
                //         //     confirmButtonClass: 'js-clipboard'
                //         // }).then((result) => {
                //         //     if (result.value) {
                //         //         new Clipboard('.js-clipboard', {
                //         //             text: function(trigger) {
                //         //                 trigger.setAttribute('data-clipboard-text', script);
                //         //                 return trigger.getAttribute('data-clipboard-text');
                //         //             }
                //         //         });
                //         //
                //         //         swalToast({
                //         //             type: 'success',
                //         //             title: 'Copied to clipboard!',
                //         //         });
                //         //     }
                //         // });
                //
                //     },
                //     error: function(error) {
                //         console.log(error);
                //
                //         swal({
                //             type: 'error',
                //             title: 'Oops...',
                //             text: error.responseText,
                //             showCloseButton: true
                //         });
                //     }
                // });
                // }
            }
            // function createChatbot(settings) {
            //
            // }
            // function updateChatbot(settings) {
            //
            // }
        };

        var validateSettings = function validateSettings() {
            var valid = true;
            var validator = new FormValidator("chatbot-properties", [{
                name: "botName",
                display: 'Title',
                rules: "required"
            }, {
                name: "websiteUrl",
                display: 'Website',
                rules: "valid_url"
            }], function (errors, event) {
                var form = event.target;

                // let validBlocks = form.querySelectorAll('.form-field__valid');
                var errorBlocks = form.querySelectorAll('.form-field__error');

                // validBlocks.forEach((item) => {
                //     let v = item.closest('.has-valid');
                //     if (v) {
                //         v.classList.remove('has-valid');
                //     }
                //     item.remove();
                // });
                errorBlocks.forEach(function (item) {
                    var e = item.closest('.has-error');
                    if (e) {
                        e.classList.remove('has-error');
                    }
                    item.remove();
                });

                if (errors.length > 0) {
                    // Show the errors
                    // console.log("errors ", errors);

                    errors.forEach(function (error) {
                        var el = error.element,
                            parent = el.closest('.properties-list-item');

                        parent.classList.add('has-error');
                        var errorText = document.createElement('div');
                        errorText.classList.add('form-field__error');
                        errorText.textContent = error.message;
                        parent.appendChild(errorText);
                    });
                    valid = false;
                }
            });
            $('#chatbot-properties').submit();
            // document.getElementById('chatbot-properties').submit();
            // console.log('form submitted');
            return valid;
        };

        var validateBuilderComponents = function validateBuilderComponents(data) {

            var operators = data.operators,
                links = data.links,
                componentsAmount = Object.keys(operators).length,
                minAmount = 2,
                allFormElements = $flowchart.find('textarea, input');

            var answerArr = [];

            if (componentsAmount) {

                if (componentsAmount < minAmount) {
                    // alert('Add ' + (minAmount - componentsAmount) + ' more components');
                    (0, _sweetAlertsMixins.toast)({
                        type: 'error',
                        title: 'Add ' + (minAmount - componentsAmount) + ' more component'
                    });
                    answerArr.push(false);
                } else {

                    // if (components.length < 2) {
                    //     alert('Add a "Answer" component');
                    //     answerArr.push(false);
                    // } else {
                    var isQuestionsHasAnswers = function isQuestionsHasAnswers() {
                        var questionComponents = Object.keys(operators).filter(function (c) {
                            return c.indexOf('question') > -1;
                        });
                        // console.log('questionComponents', questionComponents);
                        var fromOperatorArr = [],
                            toOperatorArr = [],
                            matches = [];
                        for (var link in links) {
                            if (links.hasOwnProperty(link)) {
                                var fromOperator = links[link].fromOperator,
                                    toOperator = links[link].toOperator;
                                if (fromOperator.indexOf('question') > -1 && toOperator.indexOf('answer') > -1) {

                                    matches.push(fromOperator);
                                }
                                // if (toOperator.indexOf('answer') > -1) {
                                //     toOperatorArr.push(toOperator);
                                // }
                            }
                        }
                        matches = matches.filter(function (c, i, arr) {
                            return arr.indexOf(c) === i;
                        });

                        return questionComponents.length === matches.length ? true : false;
                    };

                    var components = [];
                    // questions,
                    // answers;
                    allFormElements.each(function (i, el) {
                        var splittedId = el.id.split('_');
                        splittedId.splice(-1, 1);
                        var id = splittedId.join('_');
                        components.push(id);
                    });

                    // questions = getDuplicatesInArray('question', components);
                    // answers = getDuplicatesInArray('answer', components);

                    // make unique array
                    components = components.filter(function (c, i, arr) {
                        return arr.indexOf(c) === i;
                    });

                    if (!isQuestionsHasAnswers()) {
                        (0, _sweetAlertsMixins.toast)({
                            type: 'error',
                            title: 'Not all "Question" components linked with "Answer"'
                        });

                        answerArr.push(false);
                    }
                    // let equalityQuesAndAnsw = compareQuestionAndAnswerAmount(operators);
                    // if (equalityQuesAndAnsw !== 0) {
                    //     if (equalityQuesAndAnsw > 0) {
                    //         // alert('Add ' + equalityQuesAndAnsw +  ' more components "Answer"');
                    //         swalToast({
                    //             type: 'error',
                    //             title: 'Add ' + equalityQuesAndAnsw +  ' more component(s) "Answer"',
                    //         });
                    //     } else {
                    //         // alert('Remove ' + Math.abs(equalityQuesAndAnsw) +  ' extra "Answer" component');
                    //         swalToast({
                    //             type: 'error',
                    //             title: 'Remove ' + Math.abs(equalityQuesAndAnsw) +  ' extra "Answer" component',
                    //         });
                    //     }
                    //     answerArr.push(false);
                    // } else {
                    allFormElements.each(function (i, el) {
                        var flowChartOperator = el.closest('.flowchart-operator'),
                            flowChartOperatorBody = el.closest('.flowchart-operator-body');

                        flowChartOperator.classList.remove('has-error');
                        var tooltip = new _tooltip2.default({
                            el: flowChartOperatorBody,
                            text: 'This field cannot be empty',
                            position: 'up',
                            length: 'medium',
                            visible: true
                        });
                        tooltip.delete();

                        if (el.value === "") {
                            (0, _sweetAlertsMixins.toast)({
                                type: 'error',
                                title: 'You have empty component(s)'
                            });
                            flowChartOperator.classList.add('has-error');
                            tooltip.set();
                            // throw false;
                            answerArr.push(false);
                        }

                        if (el.id.indexOf('link') > -1) {
                            var url = el.value;
                            var valid = /^(ftp|http|https):\/\/[^ "]+$/.test(url);
                            if (!valid) {
                                (0, _sweetAlertsMixins.toast)({
                                    type: 'error',
                                    title: 'You have incorrect url(s)'
                                });
                                flowChartOperator.classList.add('has-error');
                                tooltip.text = 'This field has incorrect url';
                                tooltip.set();
                                // throw false;
                                answerArr.push(false);
                            }
                        }
                    });
                    // }
                    // }
                }
            } else {
                (0, _sweetAlertsMixins.toast)({
                    type: 'error',
                    title: 'There are no components added'
                });
                answerArr.push(false);
            }

            // console.log(answerArr);
            // return true;
            return answerArr.every(function (ans) {
                return ans == true;
            });
        };

        var validateLinks = function validateLinks(data) {
            var operatorsArr = Object.keys(data.operators),
                linksArr = Object.keys(data.links);

            for (var link in data.links) {
                if (link === undefined) continue;

                var idx = +link;

                var fromOperator = data.links[idx].fromOperator,
                    toOperator = data.links[idx].toOperator;

                for (var i = idx + 1; i <= linksArr.length; i++) {
                    if (data.links[i] === undefined) continue;

                    var nextFromOperator = data.links[i].fromOperator,
                        nextToOperator = data.links[i].toOperator;

                    if (fromOperator === nextToOperator && nextFromOperator === toOperator) {
                        // alert('You cannot cycle components!');
                        (0, _sweetAlertsMixins.toast)({
                            type: 'error',
                            title: 'You cannot cycle components!'
                        });
                        return false;
                    }
                    if (fromOperator === nextFromOperator && toOperator === nextToOperator) {
                        (0, _sweetAlertsMixins.toast)({
                            type: 'error',
                            title: 'You have double linked components'
                        });
                        return false;
                    }
                }
            }

            var uniqOpers = [];
            for (var _link5 in data.links) {
                if (data.links.hasOwnProperty(_link5)) {
                    var _toOperator2 = data.links[_link5].toOperator;

                    if (uniqOpers.indexOf(_toOperator2) === -1) {
                        uniqOpers.push(_toOperator2);
                    }
                }
            }

            if (uniqOpers.length + 1 !== operatorsArr.length) {
                if (uniqOpers.length + 1 < operatorsArr.length) {
                    (0, _sweetAlertsMixins.toast)({
                        type: 'error',
                        title: 'Not all links are connected!'
                    });

                    return false;
                } else if (uniqOpers.length + 1 > operatorsArr.length) {
                    (0, _sweetAlertsMixins.toast)({
                        type: 'error',
                        title: 'You cannot cycle components!'
                    });

                    return false;
                }
            }

            return true;
        };

        var getDuplicatesInArray = function getDuplicatesInArray(name, arr) {
            var res = [];
            var element = name;
            var idx = arr.indexOf(element);
            while (idx != -1) {
                res.push(idx);
                idx = arr.indexOf(element, idx + 1);
            }

            return res;
        };

        var createObjectFromFormData = function createObjectFromFormData(formsArr) {
            if (!(formsArr instanceof Array)) {
                throw new Error('You can use Array only as argument');
            }

            var newObj = {};

            formsArr.forEach(function (form) {
                var formName = form.id.toCamelCase(),
                    formElements = Array.from(form.elements),
                    serializedForm = $(form).serializeArray();

                // if (!form.classList.contains('is-inactive')) {
                var fileName = void 0,
                    uploadedFileName = void 0;
                formElements.forEach(function (el) {
                    if (el.type === 'file') {
                        fileName = el.name.toCamelCase();
                        uploadedFileName = el.files[0] ? el.files[0].name : "";
                    }
                });

                Object.assign(newObj, _defineProperty({}, formName, {}));
                for (var i = 0; i < serializedForm.length; i++) {
                    Object.assign(newObj[formName], _defineProperty({}, serializedForm[i].name.toCamelCase(), serializedForm[i].value));
                }
                Object.assign(newObj[formName], _defineProperty({}, fileName, uploadedFileName));
            });

            return newObj;
        };

        var compareQuestionAndAnswerAmount = function compareQuestionAndAnswerAmount(operators) {
            var questions = [],
                questionOutputs = 0,
                answers = [];

            for (var oper in operators) {
                if (oper.indexOf(componentTypes.question) > -1) {
                    // questions[oper] = operators[oper];
                    questions.push(_defineProperty({}, oper, operators[oper]));
                }
                if (oper.indexOf(componentTypes.answer) > -1) {
                    answers.push(_defineProperty({}, oper, operators[oper]));
                }
            }
            // console.log(l);
            questions.forEach(function (ques) {
                var id = Object.keys(ques)[0];
                var outputs = Object.keys(ques[id].properties.outputs);
                questionOutputs += outputs.length;
            });

            return questionOutputs - answers.length;
        };

        window.addEventListener('beforeunload', function (event) {
            event.preventDefault();
            event.returnValue = "\o/";
            // swal({
            //     title: 'Are you sure?',
            //     text: "You won't be able to revert this!",
            //     type: 'warning',
            //     showCancelButton: true,
            //     confirmButtonColor: '#4c84ff',
            //     cancelButtonColor: '#f50023',
            //     confirmButtonText: 'Yes, delete it!'
            // }).then((result) => {
            //     if (result.value) {
            //
            //     }
            // })
        });

        var ownerUser = document.getElementById('ownerUser');
        var ownerCampaign = document.getElementById('ownerCampaign');
        var ownerInteraction = document.getElementById('ownerInteraction');
        var chatbotIdInput = document.getElementById('chatbotId');
        if (ownerUser && ownerCampaign && ownerInteraction) {
            ownerUser.value = window.sessionStorage.getItem('ownerUser');
            ownerCampaign.value = window.sessionStorage.getItem('ownerCampaign');
            ownerInteraction.value = window.sessionStorage.getItem('ownerInteraction');
        }

        // function getChatbotIdParameter(parameterName) {
        //     var result = null,
        //     tmp = [];
        //     location.search
        //         .substr(1)
        //         .split("&")
        //         .forEach(function (item) {
        //             tmp = item.split("=");
        //             if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        //         });
        //     return result;
        // }
        var chatbotId = +$wholeBuilderContainer.get(0).dataset.chatbotId;
        var initBuilder = function initBuilder() {

            if (chatbotId) {
                // console.log('url', `${url}/${chatbotId}`);
                var _data = {
                    id: chatbotId
                };
                $.ajax({
                    url: '/api/get_chatbot_for_update',
                    method: "GET",
                    dataType: 'json',
                    data: _data,
                    success: function success(res) {
                        hash = res.chatbotSettings.chatbotProperties.botScriptName.split('.')[1];
                        // hash = res.chatbotScript.filename.split('.')[1];
                        // console.log(res);
                        // let data = JSON.parse(res);
                        setChatbotSettings(settingsForms, res.chatbotSettings);
                        $flowchart.flowchart('setData', res.logicSettings);
                        // console.log(data);
                    },
                    error: function error(_error) {
                        console.log(_error);
                    }
                });
            }
        };
        var setChatbotSettings = function setChatbotSettings(forms, settings) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {

                for (var _iterator = forms[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var form = _step.value;

                    var formName = form.id.toCamelCase();
                    var formElements = form.elements;

                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = formElements[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var el = _step2.value;

                            if (el.tagName === "BUTTON") {
                                continue;
                            }
                            el.value = settings[formName][el.name];

                            if (el.classList.contains('background-select')) {
                                changeTypeOfBackground(el);
                            }

                            if (el.closest('label')) {
                                el.closest('label').style.backgroundColor = settings[formName][el.name];
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        };
        // initBuilder('https://api.myjson.com/bins/unpwc');
        initBuilder();

        // preventDefault all settings forms and set default styles
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = settingsForms[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var form = _step3.value;

                if (form.id !== 'chatbot-properties') {
                    var parent = form.closest('.properties-list-item');
                    setDefaultStyles(parent);

                    Array.from(form.elements).forEach(function (el) {
                        el.addEventListener('change', function (event) {
                            event.target.closest('form').classList.add('is-dirty');
                        });
                    });
                }
                form.addEventListener('submit', function (event) {
                    return event.preventDefault();
                });
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }

        $('#chatbot-properties').on('submit', function (event) {
            event.preventDefault();
        });

        $flowchart.panzoom({
            minScale: 0.5,
            maxScale: 1.5,
            increment: 0.25,
            linearZoom: true
            // disableZoom: true,
            // contain: 'invert'
        });

        // $('.reset-pan').click(function () {
        //     $flowchart.panzoom("resetZoom", {
        //         animate: false,
        //         silent: true
        //     });
        //     $flowchart.panzoom('pan', -cx + $container.width() / 2, -cy + $container.height() / 2);
        // });
        // Centering panzoom
        $flowchart.panzoom('pan', -cx + $container.width() / 2, -cy + $container.height() / 2);
        // Panzoom zoom handling...
        var possibleZooms = [1.5, 1.25, 1, 0.75, 0.5];
        var currentZoom = 2;
        $container.on('mousewheel.focal', function (e) {
            e.preventDefault();
            var delta = e.delta || e.originalEvent.wheelDelta || e.originalEvent.detail;
            var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
            currentZoom = Math.max(0, Math.min(possibleZooms.length - 1, currentZoom + (zoomOut * 2 - 1)));
            $flowchart.flowchart('setPositionRatio', possibleZooms[currentZoom]);

            // console.log('zoomOut', zoomOut);
            // console.log('currentZoom', currentZoom);
            $flowchart.panzoom('zoom', zoomOut, {
                animate: false,
                focal: e
            });
            // let getT = $flowchart.panzoom('getMatrix');
            // console.log('getMatrix', getT);
            // $flowchart.flowchart('setPositionRatio', getT[0]);
        });

        $flowchart.flowchart({
            data: data,
            linkWidth: 9,
            grid: 20,
            linkNum: 0,
            linkVerticalDecal: 1,
            // multipleLinksOnInput: true,
            // multipleLinksOnOutput : true,
            onLinkCreate: function onLinkCreate(linkId, linkData) {
                var fromOperator = linkData.fromOperator,
                    toOperator = linkData.toOperator,
                    fromComponentType = fromOperator.indexOf(componentTypes.callToAction) > -1 ? 'call_to_action' : fromOperator.indexOf(componentTypes.question) > -1 ? 'question' : fromOperator.indexOf(componentTypes.answer) > -1 ? 'answer' : fromOperator.indexOf(componentTypes.statement) > -1 ? 'statement' : fromOperator.indexOf(componentTypes.image) > -1 ? 'image' : undefined,
                    toComponentType = toOperator.indexOf(componentTypes.callToAction) > -1 ? 'call_to_action' : toOperator.indexOf(componentTypes.question) > -1 ? 'question' : toOperator.indexOf(componentTypes.answer) > -1 ? 'answer' : toOperator.indexOf(componentTypes.statement) > -1 ? 'statement' : toOperator.indexOf(componentTypes.image) > -1 ? 'image' : undefined;

                if (fromComponentType === componentTypes.question) {
                    if (toComponentType !== componentTypes.answer) {
                        // alert('"Question" component can be linked only with "Answer" component!');
                        (0, _sweetAlertsMixins.toast)({
                            type: 'error',
                            title: '"Question" component can be linked only with "Answer" component!'
                        });
                        return false;
                    }
                } else if (fromComponentType === componentTypes.answer) {
                    if (toComponentType === componentTypes.answer) {
                        // alert('"Answer" component cannot be linked with "Answer" component!');
                        (0, _sweetAlertsMixins.toast)({
                            type: 'error',
                            title: '"Answer" component cannot be linked with "Answer" component!'
                        });
                        return false;
                    }
                } else if (toComponentType === componentTypes.answer) {
                    if (fromComponentType !== componentTypes.question) {
                        // alert('"Answer" component cannot be linked with "Answer" component!');
                        (0, _sweetAlertsMixins.toast)({
                            type: 'error',
                            title: '"Answer" component can be linked only with "Question" component!'
                        });
                        return false;
                    }
                }

                linkData.color = colors[Math.floor((0, _randomTo2.default)(colors.length))];

                return true;
            },
            onAfterChange: function onAfterChange(changeType) {
                var data = void 0;

                if (changeType === 'operator_create' || changeType === 'operator_delete') {

                    data = $flowchart.flowchart('getData');
                    componentInputs = Array.from(document.querySelectorAll('.flowchart-operator textarea'));
                    checkComponentInputsLength(componentInputs);
                    activeComponentValidation(data);
                }
            },
            onOperatorCreate: function onOperatorCreate(operatorId, operatorData, fullElement) {
                var data = $flowchart.flowchart('getData');
                var operators = Object.keys(data.operators);
                if (!operators.length) {
                    fullElement.operator.addClass('is-starting-component');
                    fullElement.operator.attr('data-starting-component', 'true');
                }
                builderCanvas.classList.add('is-dropped');

                console.log('operatorId', operatorId);
                // let oper = $flowchart.flowchart('getOperatorElement', operatorId);
                // console.log('oper', oper);
                activeComponentValidation(data);
                return true;
            },
            onOperatorDelete: function onOperatorDelete() {
                var data = $flowchart.flowchart('getData');
                var operators = Object.keys(data.operators);
                if (operators.length === 1) {
                    builderCanvas.classList.remove('is-dropped');

                    $flowchart.panzoom("resetZoom", {
                        animate: false,
                        silent: true
                    });
                    // Centering panzoom
                    $flowchart.panzoom('pan', -cx + $container.width() / 2, -cy + $container.height() / 2);
                    $flowchart.flowchart('setPositionRatio', 1);
                }
                return true;
            }
        });

        // function dragOver(e) {
        //     e.preventDefault();
        //     console.log('dragOver');
        // }
        // function dragEnter(e) {
        //     e.preventDefault();
        //     console.log('dragEnter');
        // }
        // function dragLeave() {
        //     console.log('dragLeave');
        // }
        // function drogDrop() {
        //     console.log('drop');
        // }
        //
        // function dragStart(e) {
        //     console.log('dragStart');
        //
        //     // let dt = e.originalEvent.dataTransfer;
        //     // dt.setData("text/html", this.outerHTML);
        //     let canv = document.querySelector('.chatbot-builder__canvas');
        //     canv.classList.remove('is-dropped');
        // }
        // function dragEnd() {
        //     console.log('dragEnd');
        //
        //     // let canv = document.querySelector('.chatbot-builder__canvas');
        //     // canv.classList.add('is-dropped');
        // }
        // $draggableOperators.on('dragstart', dragStart);
        // $draggableOperators.on('dragend', dragEnd);
        //
        // let canv = document.querySelector('.chatbot-builder__canvas');
        // canv.addEventListener('dragover', dragOver);
        // canv.addEventListener('dragenter', dragEnter);
        // canv.addEventListener('dragleave', dragLeave);
        // canv.addEventListener('drop', drogDrop);

        $draggableOperators.draggable((_$draggableOperators$ = {
            cursor: "move",
            opacity: 0.7,

            helper: 'clone',
            appendTo: 'body',
            zIndex: 1000,
            cancel: '.disable'

        }, _defineProperty(_$draggableOperators$, 'helper', function helper(e) {
            var $this = $(this),
                data = getOperatorData($this);

            return $flowchart.flowchart('getOperatorElement', data);
        }), _defineProperty(_$draggableOperators$, 'start', function start(event) {
            var dragEl = getComponent(event.target);
            dragEl.classList.add('is-dragging');

            var operators = document.querySelector('.flowchart-operators-layer');
            if (operators.children.length) {
                builderCanvas.classList.add('is-dropped');
            } else {
                builderCanvas.classList.remove('is-dropped');
            }
            builderCanvas.classList.add('is-dragging');
        }), _defineProperty(_$draggableOperators$, 'stop', function stop(e, ui) {
            var operatorId = void 0;
            var $this = $(this);
            var dragEl = getComponent(e.target);
            dragEl.classList.remove('is-dragging');
            var elOffset = ui.offset;
            var containerOffset = $container.offset();
            if (elOffset.left > containerOffset.left && elOffset.top > containerOffset.top && elOffset.left < containerOffset.left + $container.width() && elOffset.top < containerOffset.top + $container.height()) {

                var flowchartOffset = $flowchart.offset();

                var relativeLeft = elOffset.left - flowchartOffset.left;
                var relativeTop = elOffset.top - flowchartOffset.top;

                var positionRatio = $flowchart.flowchart('getPositionRatio');
                relativeLeft /= positionRatio;
                relativeTop /= positionRatio;

                var _data2 = getOperatorData($this);
                _data2.left = relativeLeft;
                _data2.top = relativeTop;

                var componentType = $this.closest('.b-builder-component').data('component-type'),
                    componentId = getLastOperatorId(componentType);

                if (componentId !== null) {
                    ++componentId;
                } else {
                    componentId = 0;
                }

                operatorId = componentType + '_' + componentId;

                // console.log('operatorId = ', operatorId);
                // $flowchart.flowchart('addOperator', data);
                $flowchart.flowchart('createOperator', operatorId, _data2);
            }

            var operators = document.querySelector('.flowchart-operators-layer');
            if (operators.children.length) {
                builderCanvas.classList.add('is-dropped');
            }
            builderCanvas.classList.remove('is-dragging');
        }), _$draggableOperators$));

        activeComponentValidation(data);

        $builderButtons.createComponent.click(function () {
            var properties = getOperatorData($(this)).properties;
            var component = getComponent(this),
                componentName = component.dataset.componentType,
                operatorId = componentName + '_' + (getLastOperatorId(componentName) + 1);

            // if (componentName === componentTypes.callToAction) {
            //     title = 'Call to action';
            //     body = {
            //         inputText: {
            //             value: "Some value",
            //             limit: 300
            //         }
            //     };
            //     outputs = {
            //         output_1: {
            //             label: ""
            //         }
            //     };
            // } else if (componentName === componentTypes.question) {
            //     title = 'Question';
            //     body = {
            //         inputText: {
            //             value: "Some value",
            //             limit: 300
            //         }
            //     };
            //     inputs = {
            //         inputs_1: {
            //             label: ""
            //         }
            //     };
            //     outputs = {
            //         output_1: {
            //             label: ""
            //         }
            //     };
            // } else if (componentName === componentTypes.answer) {
            //     title = 'Answer';
            //     body = {
            //         inputText: {
            //             value: "Some value",
            //             limit: 300
            //         }
            //     };
            //     inputs = {
            //         inputs_1: {
            //             label: ""
            //         }
            //     };
            //     outputs = {
            //         output_1: {
            //             label: ""
            //         }
            //     };
            // } else if (componentName === componentTypes.statement) {
            //     title = 'Statement';
            //     body = {
            //         inputText: {
            //             value: "Some value",
            //             limit: 300
            //         }
            //     };
            //     inputs = {
            //         inputs_1: {
            //             label: ""
            //         }
            //     };
            //     outputs = {
            //         output_1: {
            //             label: ""
            //         }
            //     };
            // } else if (componentName === componentTypes.image) {
            //     title = 'Image';
            //     body = {
            //         inputText: false,
            //         image: {
            //             url: ''
            //         }
            //     };
            //     inputs = {
            //         inputs_1: {
            //             label: ""
            //         }
            //     };
            //     outputs = {
            //         output_1: {
            //             label: ""
            //         }
            //     };
            // }
            var operatorData = {
                top: cy - (0, _randomTo2.default)(300),
                left: cx - (0, _randomTo2.default)(300),
                properties: properties
            };

            // console.log('operatorData', operatorData);
            $flowchart.flowchart('createOperator', operatorId, operatorData);

            var operators = document.querySelector('.flowchart-operators-layer');
            builderCanvas.classList.add('is-dropped');
        });
        $('#saveChatbot').click(function (e) {
            e.preventDefault();

            var data = $flowchart.flowchart('getData');
            onSaveBuilder(data, 'save');
        });
        $('#updateChatbot').click(function (e) {
            e.preventDefault();

            var data = $flowchart.flowchart('getData');
            onSaveBuilder(data, 'update');
        });
        $('#testChatbot').click(function (e) {
            e.preventDefault();

            var data = $flowchart.flowchart('getData');
            onSaveBuilder(data, 'test');
        });
    }
    function checkComponentInputsLength(inputs) {

        inputs.forEach(function (input) {

            var valLength = input.value.length,
                textLimit = input.maxLength,
                remainder = textLimit - valLength;

            input.closest('.textarea-wrap').querySelector('.badge-ellipse').textContent = remainder;
            // return remainder;
        });
    }
    checkComponentInputsLength(componentInputs);
    function uploadFiles(e) {
        var _this = this;
        var thumbId = _this.dataset.thumbnailEl,
            thumbEl = document.querySelector('[data-id="' + thumbId + '"]');
        // console.log($(thumbEl));
        var title = void 0,
            reg = /image[.\/]*/,
            files = e.target.files;

        var ctx = void 0;
        // let img = new Image();

        thumbEl.removeAttribute('style');
        if (_this.dataset.text) {
            title = _this.closest('.btn-upload').querySelector('.btn-upload__title');
            title.textContent = 'Upload';
        }

        if (thumbEl.tagName.toLowerCase() === 'canvas') {
            thumbEl.width = thumbEl.offsetWidth;
            thumbEl.height = thumbEl.offsetHeight;
            ctx = thumbEl.getContext('2d');
            ctx.clearRect(0, 0, thumbEl.width, thumbEl.height);
        }

        if (_this.closest('.logo-upload-wrapper')) {
            _this.closest('.logo-upload-wrapper').querySelector('.img-thumbnail').classList.remove('is-uploaded');
        }
        if (_this.closest('.custom-upload')) {
            _this.closest('.custom-upload').classList.remove('is-uploaded');
        }
        if (typeof FileReader == "undefined") return true;

        var i = void 0,
            f = void 0;
        for (i = 0; f = files[i]; i++) {
            if (reg.test(f.type)) {
                (function () {
                    var reader = new FileReader();
                    var img = void 0;

                    reader.onloadend = function (theFile) {
                        console.log('onloadend');
                        var name = f.name,
                            result = f.result;
                        return function (e) {
                            if (_this.closest('.btn-upload')) {
                                // _this.removeAttribute('disabled');
                                _this.disabled = !_this.disabled;
                                _this.closest('.btn-upload').classList.remove('is-uploading');
                            }
                            if (_this.dataset.text) {
                                title.textContent = name;
                            }
                            console.log('onloadend');
                        };
                    }(f);
                    reader.onload = function (theFile) {
                        console.log('onload');
                        var file = f;
                        return function (e) {
                            if (thumbEl.tagName.toLowerCase() !== 'canvas') {
                                var imageUrl = e.target.result;
                                thumbEl.style.backgroundImage = 'url(' + imageUrl + ')';
                                _this.closest('.logo-upload-wrapper').querySelector('.img-thumbnail').classList.add('is-uploaded');
                            } else {
                                // thumbEl.width = thumbEl.offsetWidth;
                                // thumbEl.height = thumbEl.offsetHeight;
                                // let ctx = thumbEl.getContext('2d');
                                ctx.fillStyle = "#ffffff";
                                ctx.fillRect(0, 0, thumbEl.width, thumbEl.height);
                                img = new Image();
                                // ctx.drawImage(img, 0, 0, thumbEl.width, thumbEl.width * thumbEl.height / thumbEl.width);
                                img.onload = function () {
                                    drawImageProp(ctx, this, 0, 0, thumbEl.width, thumbEl.height);
                                    _this.closest('.custom-upload').classList.remove('is-uploading');
                                    _this.closest('.custom-upload').classList.add('is-uploaded');
                                    _this.disabled = !_this.disabled;
                                    URL.revokeObjectURL(img.src);
                                };
                                img.src = URL.createObjectURL(file);
                            }
                            console.log('onload');
                        };
                    }(f);
                    reader.onloadstart = function () {
                        if (_this.closest('.btn-upload')) {
                            // console.log($(_this));
                            _this.disabled = !_this.disabled;
                            _this.closest('.btn-upload').classList.add('is-uploading');
                        }
                        if (_this.closest('.custom-upload')) {
                            // console.log($(_this));
                            _this.disabled = !_this.disabled;
                            _this.closest('.custom-upload').classList.remove('is-uploaded');
                            _this.closest('.custom-upload').classList.add('is-uploading');
                        }
                    };
                    reader.readAsDataURL(f);
                    console.log('reader', reader);
                    // img.src = URL.createObjectURL(e.target.files[0]);
                    // console.log(img.src);
                })();
            }
        }
    }

    function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {

        if (arguments.length === 2) {
            x = y = 0;
            w = ctx.canvas.width;
            h = ctx.canvas.height;
        }

        // default offset is center
        offsetX = typeof offsetX === "number" ? offsetX : 0.5;
        offsetY = typeof offsetY === "number" ? offsetY : 0.5;

        // keep bounds [0.0, 1.0]
        if (offsetX < 0) offsetX = 0;
        if (offsetY < 0) offsetY = 0;
        if (offsetX > 1) offsetX = 1;
        if (offsetY > 1) offsetY = 1;

        var iw = img.width,
            ih = img.height,
            r = Math.min(w / iw, h / ih),
            nw = iw * r,
            // new prop. width
        nh = ih * r,
            // new prop. height
        cx,
            cy,
            cw,
            ch,
            ar = 1;

        // decide which gap to fill
        if (nw < w) ar = w / nw;
        if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh; // updated
        nw *= ar;
        nh *= ar;

        // calc source rectangle
        cw = iw / (nw / w);
        ch = ih / (nh / h);

        cx = (iw - cw) * offsetX;
        cy = (ih - ch) * offsetY;

        // make sure source rectangle is valid
        if (cx < 0) cx = 0;
        if (cy < 0) cy = 0;
        if (cw > iw) cw = iw;
        if (ch > ih) ch = ih;

        // fill image in dest. rectangle
        ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
    }

    // Collapse setting blocks at Build page
    collapseItems.forEach(function (item) {
        item.addEventListener('click', function () {
            var parent = this.closest('.properties-list-item') || this.closest('.settings-card');
            if (this.dataset.collapse) {
                parent.classList.add('is-collapse');
            } else {
                parent.classList.toggle('is-collapse');
            }
        });
    });

    var defaultBtns = Array.from(document.querySelectorAll('.js-set-default')),
        editBtns = Array.from(document.querySelectorAll('.js-edit-property')),
        bgSelects = Array.from(document.querySelectorAll('.background-select')),
        inputsColor = Array.from(document.querySelectorAll('.input-color'));

    // reset settings by clicking the default button
    defaultBtns.forEach(function (btn) {
        btn.addEventListener('click', function (event) {
            var target = event.target,
                parent = target.closest('.properties-list-item'),
                form = parent.querySelector('form');

            this.classList.add('is-active');
            form.classList.remove('is-dirty');
            // parent.querySelector('form').classList.add('is-inactive');
            setTimeout(function () {
                return setDefaultStyles(parent);
            }, 300);
        });
    });
    editBtns.forEach(function (btn) {
        btn.addEventListener('click', function (event) {
            var target = event.target,
                parent = target.closest('.properties-list-item'),
                form = parent.querySelector('form');

            if (form.classList.contains('is-dirty')) {

                parent.querySelector('.js-set-default').classList.remove('is-active');
                // parent.querySelector('form').classList.remove('is-inactive');
            }
        });
    });

    // show/hide solid/gradient block
    bgSelects.forEach(function (select) {
        select.addEventListener('change', changeTypeOfBackground);
    });

    // custom input type="color"
    inputsColor.forEach(function (label) {
        label.control.addEventListener('change', function (event) {
            var target = event.target,
                value = target.value,
                label = target.labels[0];

            label.style.backgroundColor = value;
        });
    });

    function setDefaultStyles(parent) {
        var defaultOpts = {
            base: {
                'maxWidth': 330,
                'maxHeight': 450,
                'borderRadius': 5,
                'position': 'right',
                'distanceFromEdge': 20,
                'distanceFromBottom': 0
            },
            head: {
                'background': 'gradient',
                'backgroundColor': '#000000',
                'gradientFrom': '#4d84fe',
                'gradientTo': '#7b76f5',
                'fontColor': '#ffffff'
            },
            body: {
                'background': 'solid',
                'backgroundColor': '#ffffff',
                'gradientFrom': '#000000',
                'gradientTo': '#000000'
            },
            question: {
                'background': 'solid',
                'backgroundColor': '#4c84ff',
                'gradientFrom': '#000000',
                'gradientTo': '#000000',
                'fontColor': '#ffffff'
            },
            answer: {
                'background': 'solid',
                'backgroundColor': '#edeff2',
                'gradientFrom': '#000000',
                'gradientTo': '#000000',
                'fontColor': '#000000'
            },
            buttons: {
                'background': 'solid',
                'backgroundColor': '#febb06',
                'gradientFrom': '#000000',
                'gradientTo': '#000000',
                'fontColor': '#ffffff'
            }
        };
        var propertyName = parent.dataset.propertyType;

        // let selects = Array.from(parent.querySelectorAll('select')),
        // inputsColor = Array.from(parent.querySelectorAll('input[type="color"]'));
        var formElements = parent.querySelector('form').elements;

        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
            for (var _iterator5 = formElements[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var el = _step5.value;

                // if (el.tagName !== 'SELECT') {
                el.value = defaultOpts[propertyName][el.name];
                // } else {
                // el.value = defaultOpts[propertyName][el.name];
                if (el.classList.contains('background-select')) {
                    changeTypeOfBackground(el);
                }
                // }

                if (el.closest('label')) {
                    el.closest('label').style.backgroundColor = defaultOpts[propertyName][el.name];
                }
            }
            // for (let select of selects) {
            //     select.selectedIndex = 0;
            //     if (select.classList.contains('background-select')) {
            //         changeTypeOfBackground(select);
            //     }
            // }
            // for (let input of inputsColor) {
            //     input.value = '#000000';
            //     input.closest('label').style.backgroundColor = '#000000'
            // }
        } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                    _iterator5.return();
                }
            } finally {
                if (_didIteratorError5) {
                    throw _iteratorError5;
                }
            }
        }
    }

    function changeTypeOfBackground(event) {
        var target = event.target || event,
            value = target.value.toLowerCase(),
            parent = target.closest('.properties-list-item'),
            colorBlock = parent.nextElementSibling,
            gradientFromBlock = parent.nextElementSibling.nextElementSibling,
            gradientToBlock = parent.nextElementSibling.nextElementSibling.nextElementSibling;

        colorBlock.classList.remove('is-visible');
        gradientFromBlock.classList.remove('is-visible');
        gradientToBlock.classList.remove('is-visible');

        if (value === 'solid') {
            colorBlock.classList.add('is-visible');
        } else {
            gradientFromBlock.classList.add('is-visible');
            gradientToBlock.classList.add('is-visible');
        }
    }
});

},{"../../_scripts/randomTo":19,"../../_scripts/sweet-alerts-mixins":20,"../../_scripts/toCamelCase":21,"../../_scripts/tooltip":22,"./../../../node_modules/validate-js/validate.js":6,"clipboard/dist/clipboard.min":2,"js-md5":3,"sweetalert2":5}],12:[function(require,module,exports){
'use strict';

var _sweetalert = require('sweetalert2');

var _sweetalert2 = _interopRequireDefault(_sweetalert);

var _sweetAlertsMixins = require('./../../_scripts/sweet-alerts-mixins');

var _clipboard = require('clipboard/dist/clipboard.min');

var _clipboard2 = _interopRequireDefault(_clipboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(function () {
    var pathName = window.location.pathname,
        regex = /\//g,
        match = pathName.match(regex);
    var baseUrl = '../'.repeat(match.length - 1);
    // console.log(res);
    var tables = $('.datatable'),
        tableLengthBtns = void 0,
        tableStatusesSelect = $('.datatable-statuses'),
        actionsDropdown = $('.js-actions-dropdown-trigger');

    if (tables.length) {
        var initDatatable = function initDatatable(opts) {
            var $table = $(opts.id);
            $table.attr('data-url', opts.url);

            if ($table.length) {
                $table = $table.DataTable({
                    // search: {
                    //     // search: 'new'
                    // },
                    // 'ordering': false,
                    // 'searching': false,
                    ajax: {
                        url: opts.url,
                        dataSrc: 'result'
                        //data: {'role':'role', 'userId':'1232'}
                    },
                    columns: opts.columns,
                    aoColumnDefs: opts.aoColumnDefs,
                    columnDefs: [{ 'orderable': false, 'targets': 'not-ordering' }],
                    language: {
                        'paginate': {
                            'next': "<svg class='icon icon-arrow icon-arrow--right'><use xlink:href='" + baseUrl + "images/sprite.svg#arrow-right' /></svg>",
                            'previous': "<svg class='icon icon-arrow icon-arrow--left'><use xlink:href='" + baseUrl + "images/sprite.svg#arrow-right' /></svg>"
                        },
                        'lengthMenu': '<div class="dataTables-custom-length">' + '<a class="dataTables-custom-length__link dataTables-custom-length__link--active js-table-length">10</a>' + '<a class="dataTables-custom-length__link js-table-length">20</a>' + '</div>',
                        'info': "Showed <b>_START_-_END_</b> out of <b>_TOTAL_</b>"
                    },
                    dom: '<"dataTables-header-wrap"li>rtp',
                    // "dom": '<"dataTables-header-wrap"<"dataTables-custom-length"<"dataTables-custom-length__item"><"dataTables-custom-length__item">>i>rtp'
                    responsive: {
                        details: {
                            type: 'inline'
                        }
                    }
                });

                $table.columns().every(function () {
                    var that = this;

                    $('input, select', this.header()).on('keyup change', function (event) {
                        $.fn.dataTable.ext.search.pop();

                        if (event.target.value !== 'archived') {
                            $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
                                // console.log('settings', settings);
                                // console.log('data', data);
                                if (data.indexOf('Archived') > -1) {
                                    return false;
                                }

                                return true;
                            });
                        }
                        if (that.search() !== this.value) {
                            that.search(event.target.value).draw();
                        }

                        // table
                        //     .columns( '.datatable-status' )
                        //     .search( event.target.value, false, true, true )
                        //     .draw();
                    });
                });

                tableLengthBtns = $('.js-table-length');
                // console.log('columns', table.columns());

                tableLengthBtns.on('click', function (event) {
                    event.preventDefault();

                    var target = event.target,
                        length = target.textContent;

                    tableLengthBtns.removeClass('dataTables-custom-length__link--active');
                    target.classList.add('dataTables-custom-length__link--active');

                    $table.page.len(length).draw();
                });
            }
        };

        // function reInitDataTable(el, obj) {
        //     $(el).DataTable().clear().destroy();
        //     initDatatable(obj);
        // }
        var getInteractionUrl = function getInteractionUrl() {
            var pathNameArr = window.location.pathname.split('/');
            return '/api/get_interactions_by_' + pathNameArr[2] + '/' + pathNameArr[3];
        };

        var getChatbotsUrl = function getChatbotsUrl() {
            var pathNameArr = window.location.pathname.split('/');
            return '/api/get_all_chatbot_by_iteration/' + pathNameArr[pathNameArr.length - 1];
        };

        var getUserId = function getUserId() {
            var pathNameArr = window.location.pathname.split('/');
            return pathNameArr[pathNameArr.length - 1];
        };

        var changeInteractionStatus = function changeInteractionStatus() {
            var tableId = this.closest('table').id;
            var tableUrl = this.closest('table').dataset.url;
            var interactionName = this.dataset.interactionName;
            var interactionId = this.dataset.interactionId;
            var campaignId = this.dataset.campaignId;
            var statusId = this.dataset.statusId;
            (0, _sweetalert2.default)({
                title: 'Are you sure?',
                text: 'You will change status: ' + interactionName,
                type: 'warning',
                showCancelButton: 'true',
                confirmButtonColor: '#4c84ff',
                cancelButtonColor: '#f50023',
                confirmButtonText: 'Yes, change it'
            }).then(function (response) {
                if (response.value === true) {
                    var data = {
                        id: interactionId,
                        status: statusId,
                        campaign_id: campaignId
                    };
                    $.ajax({
                        url: '/api/update_status_interaction',
                        type: 'put',
                        data: data,
                        contentType: 'application/x-www-form-urlencoded',
                        success: function success(data) {
                            (0, _sweetAlertsMixins.toast)({
                                type: 'success',
                                title: 'Updated'
                            });
                            updateDataTable('#' + tableId);
                        },
                        error: function error(xhr, status, _error10) {
                            var err = JSON.parse(xhr.responseText);
                            (0, _sweetalert2.default)({
                                type: 'error',
                                title: err.message
                            });
                        }
                    });
                }
            }).catch(function (err) {
                return console.log(err);
            });
        };

        var changeCampaignStatus = function changeCampaignStatus() {
            var tableId = this.closest('table').id;
            var tableUrl = this.closest('table').dataset.url;
            var campaignName = this.dataset.campaignName;
            var campaignId = this.dataset.campaignId;
            var statusId = this.dataset.statusId;
            (0, _sweetalert2.default)({
                title: 'Are you sure?',
                text: 'You will change status: ' + campaignName,
                type: 'warning',
                showCancelButton: 'true',
                confirmButtonColor: '#4c84ff',
                cancelButtonColor: '#f50023',
                confirmButtonText: 'Yes, change it'
            }).then(function (val) {
                if (val.value) {
                    var data = {
                        id: campaignId,
                        status: statusId
                    };
                    $.ajax({
                        url: '/api/update_status_campaign',
                        type: 'put',
                        data: data,
                        contentType: 'application/x-www-form-urlencoded',
                        success: function success(data) {
                            (0, _sweetAlertsMixins.toast)({
                                type: 'success',
                                title: 'Updated'
                            });
                            updateDataTable('#' + tableId);
                        },
                        error: function error(xhr, status, _error11) {
                            var err = JSON.parse(xhr.responseText);
                            (0, _sweetalert2.default)({
                                type: 'error',
                                title: err.message
                            });
                        }
                    });
                }
            }).catch(function (err) {
                return console.log(err);
            });
        };

        var changeChatbotStatus = function changeChatbotStatus(name, id, status, interaction, campaign) {
            var tableId = this.closest('table').id;
            var tableUrl = this.closest('table').dataset.url;
            var chatbotName = this.dataset.chatbotName;
            var chatbotId = this.dataset.chatbotId;
            var ownerInteractionId = this.dataset.ownerInteractionId;
            var ownerCampaignId = this.dataset.ownerCampaignId;
            var statusId = this.dataset.statusId;
            (0, _sweetalert2.default)({
                title: 'Are you sure?',
                text: 'You will change status: ' + chatbotName,
                type: 'warning',
                showCancelButton: 'true',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, change it'
            }).then(function (response) {
                if (response.value === true) {
                    var data = {
                        id: chatbotId,
                        status: statusId,
                        interaction_id: ownerInteractionId,
                        campaign_id: ownerCampaignId
                    };
                    $.ajax({
                        url: '/api/chatbot_status',
                        type: 'put',
                        data: data,
                        contentType: 'application/x-www-form-urlencoded',
                        success: function success(data) {
                            (0, _sweetAlertsMixins.toast)({
                                type: 'success',
                                title: 'Updated'
                            });
                            updateDataTable('#' + tableId);
                        },
                        error: function error(xhr, status, _error12) {
                            var err = JSON.parse(xhr.responseText);
                            (0, _sweetalert2.default)({
                                type: 'error',
                                title: err.message
                            });
                        }
                    });
                }
            }).catch(function (err) {
                return console.log(err);
            });
        };

        var updateDataTable = function updateDataTable(el) {
            $(el).DataTable().ajax.reload();
        };

        // $('.datatables tbody').on( 'click', 'tr', function (event) {
        //     let tr = table.row( this ),
        //         href,
        //         target = event.target;
        //     if (tr.length) {
        //         tr = tr.node();
        //         href = tr.dataset.href;
        //     }
        //
        //     if (target.tagName !== 'A' && href) {
        //         let a = document.createElement('a');
        //         a.href = href;
        //
        //         a.click();
        //     }
        // } );


        $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
            if (data.indexOf('Archived') > -1) {
                return false;
            }

            return true;
        });


        initDatatable({
            id: '#clients',
            // url: 'https://api.myjson.com/bins/rhbx4',
            url: '/api/clients',
            columns: [{ data: null }, { data: null }, { data: null }, { data: 'total_active' }, { data: 'sum_budget' }, { data: null }, { data: null }],
            aoColumnDefs: [{
                "aTargets": [0],
                "mData": null,
                "mRender": function mRender(data, type, full) {
                    return '<span data-balloon="User id: ' + data.user_id + '" data-balloon-pos="up">' + data.u_fullname + '</span>';
                }
            }, {
                "aTargets": [1],
                "mData": null,
                "mRender": function mRender(data, type, full) {
                    return '<a href="/campaigns/user/' + data.id + '">' + data.count_campaign + '</a>';
                }
            }, {
                "aTargets": [2],
                "mData": null,
                "mRender": function mRender(data, type, full) {
                    return '<a href="/interactions/user/' + data.id + '">' + data.count_int + '</a>';
                }
            }, {
                "aTargets": [6],
                "mData": null,
                "mRender": function mRender(data, type, full) {
                    return '<a class="sa" data-balloon="Reports" data-balloon-pos="up">\n                                    <svg id="reports" class="datatable__icon" viewBox="0 0 60 60" width="100%" height="100%">\n                                        <path d="M36.719 22h-25a1 1 0 0 0 0 2h25a1 1 0 0 0 0-2zm-25-6h10a1 1 0 0 0 0-2h-10a1 1 0 0 0 0 2zm25 14h-25a1 1 0 0 0 0 2h25a1 1 0 0 0 0-2zm-8 8h-17a1 1 0 0 0 0 2h17a1 1 0 0 0 0-2zm-3 10a1 1 0 0 0 0-2h-14a1 1 0 0 0 0 2h14z" />\n                                        <path d="M2.719 2h29v14h14v18h2V14.586L33.133 0H.719v60h29v-2h-27V2zm31 1.414L44.305 14H33.719V3.414z" />\n                                        <path d="M58.407 37.162l-2.849-2.85c-1.128-1.128-3.094-1.128-4.222 0l-15.391 15.39-2.121 7.779-.519.519a.998.998 0 0 0-.006 1.405l-.005.02.02-.005a.997.997 0 0 0 1.405-.006l.519-.519 7.779-2.121 15.39-15.391c.564-.564.875-1.313.875-2.111s-.311-1.547-.875-2.11zm-20.153 13.06l10.243-10.243 4.243 4.243-10.243 10.243-4.243-4.243zm-.903 1.925l3.22 3.22-4.427 1.207 1.207-4.427zm19.642-12.178l-2.839 2.839-4.243-4.243 2.839-2.839a1.008 1.008 0 0 1 1.393 0l2.85 2.85a.985.985 0 0 1 0 1.393z">\n                                    </svg>\n                                </a>\n                                <a class="js-delete-user" data-balloon="Delete" data-balloon-pos="up" data-email="' + data.u_email + '" data-parent-id="' + data.u_parent_user + '" data-user-id="' + data.user_id + '"  data-role-id="' + data.u_role_id + '">\n                                    <svg id="trash" class="datatable__icon" viewBox="0 0 512 512" width="100%" height="100%">\n                                        <path d="M465.423 48.241h-137.61V23.955C327.813 10.746 317.082 0 303.893 0h-95.785c-13.19 0-23.92 10.746-23.92 23.955V48.24H46.577c-6.655 0-12.049 5.394-12.049 12.049 0 6.655 5.394 12.049 12.049 12.049h22.332l15.228 396.396A44.858 44.858 0 0 0 129.099 512h253.804a44.855 44.855 0 0 0 44.96-43.267l15.228-396.396h22.332c6.653 0 12.049-5.394 12.049-12.049 0-6.653-5.394-12.047-12.049-12.047zM208.285 24.097h95.43V48.24h-95.43V24.097zm195.499 443.712a20.833 20.833 0 0 1-20.882 20.094H129.099a20.835 20.835 0 0 1-20.882-20.095L93.025 72.338h325.952l-15.193 395.471z" fill="#cacbce" />\n                                        <path d="M182.63 181.571c-.127-6.575-5.494-11.817-12.042-11.817-.078 0-.158 0-.236.002-6.652.128-11.943 5.626-11.815 12.278l3.781 196.634c.126 6.575 5.495 11.817 12.042 11.817.078 0 .158 0 .236-.002 6.653-.128 11.943-5.624 11.815-12.278l-3.781-196.634zm73.368-11.818c-6.654 0-12.049 5.394-12.049 12.049v196.634c0 6.654 5.394 12.049 12.049 12.049 6.655 0 12.049-5.394 12.049-12.049V181.802c0-6.654-5.394-12.049-12.049-12.049zm85.647.003c-6.628-.147-12.151 5.162-12.278 11.815l-3.781 196.634c-.129 6.653 5.162 12.15 11.815 12.278l.236.002c6.546 0 11.916-5.244 12.042-11.817l3.781-196.634c.128-6.654-5.161-12.151-11.815-12.278z" fill="#cacbce" />\n                                    </svg>\n                                </a>';
                },
                bSortable: false
                // aTargets: 'nosort'
            }]
        });
        initDatatable({
            id: '#campaigns',
            // url: 'https://api.myjson.com/bins/rhbx4',
            url: '/api/get_all_campaign_by_user/' + getUserId(),
            columns: [{ data: null }, { data: null }, { data: 'campaign_budget' }, { data: null }, { data: null }, { data: null }],
            aoColumnDefs: [{
                "aTargets": [0],
                "mData": null,
                "mRender": function mRender(data, type, full) {
                    return '<span data-balloon="Campaign id: ' + data.campaign_id + '" data-balloon-pos="up">\n                                    <a href="/interactions/campaign/' + full.campaign_id + '">' + data.campaign_name + '</a>\n                                </span>';
                }
            }, {
                "aTargets": [1],
                "mData": null,
                "mRender": function mRender(data, type, full) {
                    return '<div class="datatable-status-badge datatable-status-badge--' + full.status_color + '">' + full.status_name + '</div>';
                }
            }, {
                "aTargets": [5],
                "mData": null,
                "mRender": function mRender(data, type, full) {
                    return '<div class="icon-kebab"><span></span></div>\n                                <ul class="dropdown-content dropdown-content--bottom">\n                                    <li>\n                                        <a href="/campaign/update/' + data.campaign_id + '">\n                                            <svg viewBox="0 0 55.25 55.25" class="icon datatable__icon">\n                                                <path d="M52.618 2.631c-3.51-3.508-9.219-3.508-12.729 0L3.827 38.693c-.017.017-.027.038-.042.056-.021.024-.039.05-.058.076a.972.972 0 0 0-.125.239c-.009.026-.022.049-.029.075l-.012.03-3.535 14.85a.991.991 0 0 0-.022.202c0 .013-.004.025-.004.038a.995.995 0 0 0 .095.403c.049.107.11.21.196.296a1.006 1.006 0 0 0 .938.266l14.85-3.535c.027-.006.051-.021.077-.03a.985.985 0 0 0 .3-.162c.024-.019.049-.033.072-.054.008-.008.018-.012.026-.02L52.617 15.36c3.51-3.51 3.51-9.22.001-12.729zm-1.414 1.414c2.488 2.489 2.7 6.397.65 9.137l-9.787-9.787c2.741-2.05 6.649-1.838 9.137.65zm-4.95 14.85l-9.9-9.9 1.414-1.414 9.9 9.9-1.414 1.414zM4.961 50.288a.999.999 0 0 0-1.414 0l-.757.757 2.554-10.728 4.422-.491-.569 5.122c-.004.038.01.073.01.11 0 .038-.014.072-.01.11.004.033.021.06.028.092a1.016 1.016 0 0 0 .245.473c.048.051.1.094.157.134.045.031.088.06.138.084.066.031.135.049.207.066.038.009.069.03.108.035a.982.982 0 0 0 .109.006h.004a.995.995 0 0 0 .109-.006l5.122-.569-.491 4.422-10.729 2.554.757-.757a1 1 0 0 0 0-1.414zm12.55-5.479L39.889 22.43a.999.999 0 1 0-1.414-1.414L16.097 43.395l-4.773.53.53-4.773 22.38-22.378a.999.999 0 1 0-1.414-1.414L10.44 37.738l-3.183.354L34.94 10.409l9.9 9.9-27.683 27.683.354-3.183zm31.571-28.742l-9.9-9.9 1.415-1.415 9.9 9.9-1.415 1.415z" fill="#cacbce"></path>\n                                            </svg>\n                                            Edit\n                                        </a>\n                                    </li>\n                                    <li>\n                                        <a class="js-clone-campaign" data-campaign-name="' + data.campaign_name + '" data-campaign-id="' + data.campaign_id + '">\n                                            <svg viewBox="0 0 512 512" class="icon datatable__icon up-status">\n                                                <path d="M439.449 51.2h-81.8l-43.8-46.5c0-.1-.1-.1-.2-.1l-.6-.6c-.2-.1-.3-.3-.5-.4-.2-.2-.5-.4-.7-.6-.2-.1-.3-.2-.5-.3l-.9-.6c-.1-.1-.2-.2-.4-.2l-1.2-.6c-.1 0-.1-.1-.2-.1-1.6-.8-3.6-1.2-5.7-1.2h-230.3c-8.3 0-15 6.7-15 15v430.8c0 8.3 6.7 15 15 15h38.6V497c0 8.3 6.7 15 15 15h313.1c8.3 0 15-6.7 15-15V66.2c.1-8.3-6.6-15-14.9-15zm-121.5 1.6l33.1 35.1h-33.1V52.8zm-230.3 378V30h200.3v72.9c0 8.3 6.7 15 15 15h67.9v312.9h-283.2zm53.6 51.2v-21.2h244.5c8.3 0 15-6.7 15-15V102.9c0-.5 0-1-.1-1.5 0-.2-.1-.5-.1-.7s-.1-.5-.1-.7c-.1-.3-.1-.6-.2-.8 0-.2-.1-.4-.1-.6-.1-.3-.2-.6-.3-.8s-.1-.3-.2-.5c-.1-.3-.2-.5-.4-.8-.1-.2-.2-.4-.3-.5-.1-.2-.3-.5-.4-.7l-.3-.6c-.1-.2-.3-.4-.4-.6-.1-.2-.3-.4-.4-.6-.1-.2-.3-.4-.5-.5-.1-.1-.2-.3-.3-.4l-10.8-11.5h38.5V482h-283.1z"></path>\n                                            </svg>\n                                            Clone\n                                        </a>\n                                    </li>\n                                    <li>\n                                        <a href="#Reports">\n                                            <svg viewBox="0 0 60 60" class="icon datatable__icon up-status">\n                                                <path d="M36.719 22h-25a1 1 0 0 0 0 2h25a1 1 0 0 0 0-2zm-25-6h10a1 1 0 0 0 0-2h-10a1 1 0 0 0 0 2zm25 14h-25a1 1 0 0 0 0 2h25a1 1 0 0 0 0-2zm-8 8h-17a1 1 0 0 0 0 2h17a1 1 0 0 0 0-2zm-3 10a1 1 0 0 0 0-2h-14a1 1 0 0 0 0 2h14z"></path>\n                                                <path d="M2.719 2h29v14h14v18h2V14.586L33.133 0H.719v60h29v-2h-27V2zm31 1.414L44.305 14H33.719V3.414z"></path>\n                                                <path d="M58.407 37.162l-2.849-2.85c-1.128-1.128-3.094-1.128-4.222 0l-15.391 15.39-2.121 7.779-.519.519a.998.998 0 0 0-.006 1.405l-.005.02.02-.005a.997.997 0 0 0 1.405-.006l.519-.519 7.779-2.121 15.39-15.391c.564-.564.875-1.313.875-2.111s-.311-1.547-.875-2.11zm-20.153 13.06l10.243-10.243 4.243 4.243-10.243 10.243-4.243-4.243zm-.903 1.925l3.22 3.22-4.427 1.207 1.207-4.427zm19.642-12.178l-2.839 2.839-4.243-4.243 2.839-2.839a1.008 1.008 0 0 1 1.393 0l2.85 2.85a.985.985 0 0 1 0 1.393z"></path>\n                                            </svg>\n                                            Reports\n                                        </a>\n                                    </li>\n                                    <li>\n                                        <a class="js-change-campaign-status" data-campaign-name="' + data.campaign_name + '" data-campaign-id="' + data.campaign_id + '" data-status-id="4">\n                                            <svg viewBox="0 0 235.592 235.592" class="icon datatable__icon up-status">\n                                                <path d="M117.795.002C52.843.002 0 52.844 0 117.795 0 182.747 52.843 235.59 117.795 235.59c64.953 0 117.797-52.843 117.797-117.795C235.592 52.844 182.748.002 117.795.002zm0 220.588C61.113 220.59 15 174.477 15 117.795 15 61.114 61.113 15.002 117.795 15.002c56.683 0 102.797 46.112 102.797 102.793 0 56.682-46.115 102.795-102.797 102.795z"></path>\n                                                <path d="M139.834 68.258a7.499 7.499 0 0 0-7.5 7.5v84.076c0 4.143 3.357 7.5 7.5 7.5s7.5-3.357 7.5-7.5V75.758c0-4.143-3.357-7.5-7.5-7.5zm-44.076 0a7.499 7.499 0 0 0-7.5 7.5v84.076c0 4.143 3.357 7.5 7.5 7.5s7.5-3.357 7.5-7.5V75.758a7.5 7.5 0 0 0-7.5-7.5z"></path>\n                                            </svg>\n                                            Pause\n                                        </a>\n                                    </li>\n                                    <li>\n                                        <a href="#Play">\n                                            <svg viewBox="0 0 612.1 612.1" class="icon datatable__icon up-status">\n                                                <path d="M306 0a306 306 0 1 0 0 612 306 306 0 0 0 0-612zm0 582.4c-152.2 0-276.3-124.1-276.3-276.3S153.8 29.7 306 29.7 582.4 154 582.4 306.1 459.1 582.4 306 582.4zm119.4-297.2c-.8 0-.8-.8-1.7-.8L254 186.7a31 31 0 0 0-16-4.9c-11.2 0-23.2 8.9-23.2 28v192.3c.8 19.2 12 28 24 28 5.6 0 11.2-1.6 16.8-4.8l162.6-93.7c12-6.4 17.7-15.2 18.4-24.9.9-3.8-.7-13.5-11.1-21.5zm-181 113V215.5l157.8 91.3-157.9 91.4z" fill="#cacbce"></path>\n                                            </svg>\n                                            Play\n                                        </a>\n                                    </li>\n                                    <li>\n                                        <a class="js-change-campaign-status" data-campaign-name="' + data.campaign_name + '" data-campaign-id="' + data.campaign_id + '" data-status-id="2">\n                                            <svg viewBox="0 0 512 512" id="archive" class="icon datatable__icon up-status">\n                                                <path d="M312.461 332.734H199.539c-8.511 0-15.434 6.923-15.434 15.434v34.634c0 8.511 6.923 15.435 15.434 15.435h112.923c8.511 0 15.435-6.923 15.435-15.435v-34.634c-.002-8.51-6.925-15.434-15.436-15.434zm-4.41 45.659H203.948v-25.814h104.103v25.814z"></path>\n                                                <path d="M506.976 246.958l.159-.08L432.73 99.774c-6.015-11.89-18.025-19.275-31.346-19.275h-14.141V66.824c0-5.48-4.442-9.922-9.922-9.922H134.68c-5.48 0-9.922 4.442-9.922 9.922v13.675h-14.141c-13.321 0-25.331 7.385-31.346 19.275L4.865 246.878l.159.08A34.54 34.54 0 0 0 0 264.939v155.409c0 19.162 15.59 34.751 34.752 34.751h442.497c19.162 0 34.751-15.59 34.751-34.751V264.939a34.54 34.54 0 0 0-5.024-17.981zm-119.734-144.41h14.141a13.02 13.02 0 0 1 11.671 7.179l60.93 120.462h-41.431v-37.066c0-5.48-4.442-9.922-9.922-9.922h-12.275v-53.227c0-5.48-4.442-9.922-9.922-9.922h-13.192v-17.504zm25.468 100.496v27.144h-52.359a22.925 22.925 0 0 0-20.865 13.482l-14.296 31.71a.841.841 0 0 1-.764.493H187.575a.84.84 0 0 1-.764-.494l-14.295-31.708a22.926 22.926 0 0 0-20.866-13.483H99.291v-27.144H412.71zM144.602 76.746h222.796v43.305H144.602V76.746zm245.91 63.149V183.2H121.488v-43.305h269.024zM98.946 109.727a13.017 13.017 0 0 1 11.671-7.179h14.141v17.503h-13.192c-5.48 0-9.922 4.442-9.922 9.922V183.2H89.369c-5.48 0-9.922 4.442-9.922 9.922v37.066H38.016l60.93-120.461zm378.303 323.322H34.752c-7.004 0-12.703-5.699-12.703-12.701V264.939c0-7.003 5.698-12.701 12.703-12.701H151.65c.328 0 .629.194.765.495l14.295 31.708a22.923 22.923 0 0 0 20.865 13.481h136.85a22.924 22.924 0 0 0 20.865-13.48l14.296-31.709v-.001a.84.84 0 0 1 .764-.494h116.898c7.004 0 12.701 5.699 12.701 12.701v155.409h.001c.001 7.004-5.697 12.701-12.701 12.701z"></path>\n                                            </svg>\n                                            Archive\n                                        </a>\n                                    </li>\n                                    <li>\n                                        <a class="js-delete-campaign" data-campaign-id="' + data.campaign_id + '" data-campaign-name="' + data.campaign_name + '">\n                                            <svg viewBox="0 0 512 512" id="trash" class="icon datatable__icon">\n                                                <path d="M465.423 48.241h-137.61V23.955C327.813 10.746 317.082 0 303.893 0h-95.785c-13.19 0-23.92 10.746-23.92 23.955V48.24H46.577c-6.655 0-12.049 5.394-12.049 12.049 0 6.655 5.394 12.049 12.049 12.049h22.332l15.228 396.396A44.858 44.858 0 0 0 129.099 512h253.804a44.855 44.855 0 0 0 44.96-43.267l15.228-396.396h22.332c6.653 0 12.049-5.394 12.049-12.049 0-6.653-5.394-12.047-12.049-12.047zM208.285 24.097h95.43V48.24h-95.43V24.097zm195.499 443.712a20.833 20.833 0 0 1-20.882 20.094H129.099a20.835 20.835 0 0 1-20.882-20.095L93.025 72.338h325.952l-15.193 395.471z" fill="#cacbce"></path>\n                                                <path d="M182.63 181.571c-.127-6.575-5.494-11.817-12.042-11.817-.078 0-.158 0-.236.002-6.652.128-11.943 5.626-11.815 12.278l3.781 196.634c.126 6.575 5.495 11.817 12.042 11.817.078 0 .158 0 .236-.002 6.653-.128 11.943-5.624 11.815-12.278l-3.781-196.634zm73.368-11.818c-6.654 0-12.049 5.394-12.049 12.049v196.634c0 6.654 5.394 12.049 12.049 12.049 6.655 0 12.049-5.394 12.049-12.049V181.802c0-6.654-5.394-12.049-12.049-12.049zm85.647.003c-6.628-.147-12.151 5.162-12.278 11.815l-3.781 196.634c-.129 6.653 5.162 12.15 11.815 12.278l.236.002c6.546 0 11.916-5.244 12.042-11.817l3.781-196.634c.128-6.654-5.161-12.151-11.815-12.278z" fill="#cacbce"></path>\n                                            </svg>\n                                            Delete\n                                        </a>\n                                    </li>\n                                </ul>';
                },
                // className: 'dropdown-trigger--pointer js-actions-dropdown-trigger',
                bSortable: false,
                "sClass": 'dropdown-trigger--pointer js-actions-dropdown-trigger'
            }]
        });
        initDatatable({
            id: '#interactions',
            // url: 'https://api.myjson.com/bins/rhbx4',
            url: getInteractionUrl(),
            columns: [{ data: 'interation_name' }, { data: 'campaign_name' }, { data: 'interation_budget' }, { data: 'interation_spent' }, { data: 'interation_engagement' }, { data: 'interation_status_id' }, { data: null }],
            aoColumnDefs: [{
                "aTargets": [0],
                "mData": null,
                "mRender": function mRender(data, type, full) {
                    return '<span data-balloon="Interaction id: ' + full.interaction_id + '" data-balloon-pos="up">\n                                    <a href="/chatbots/interaction/' + full.interation_id + '">' + data + '</a>\n                                </span>';
                }
            }, {
                "aTargets": [5],
                "mData": null,
                "mRender": function mRender(data, type, full) {
                    return '<div class="datatable-status-badge datatable-status-badge--' + full.status_color + '">' + full.status_name + '</div>';
                }
            }, {
                "aTargets": [6],
                "mData": null,
                "mRender": function mRender(data, type, full) {
                    return '<div class="icon-kebab"><span></span></div>\n                                <ul class="dropdown-content dropdown-content--bottom">\n                                    <li>\n                                        <a href="/interaction/update/' + full.interation_id + '">\n                                            <svg viewBox="0 0 55.25 55.25" class="icon datatable__icon">\n                                                <path d="M52.618 2.631c-3.51-3.508-9.219-3.508-12.729 0L3.827 38.693c-.017.017-.027.038-.042.056-.021.024-.039.05-.058.076a.972.972 0 0 0-.125.239c-.009.026-.022.049-.029.075l-.012.03-3.535 14.85a.991.991 0 0 0-.022.202c0 .013-.004.025-.004.038a.995.995 0 0 0 .095.403c.049.107.11.21.196.296a1.006 1.006 0 0 0 .938.266l14.85-3.535c.027-.006.051-.021.077-.03a.985.985 0 0 0 .3-.162c.024-.019.049-.033.072-.054.008-.008.018-.012.026-.02L52.617 15.36c3.51-3.51 3.51-9.22.001-12.729zm-1.414 1.414c2.488 2.489 2.7 6.397.65 9.137l-9.787-9.787c2.741-2.05 6.649-1.838 9.137.65zm-4.95 14.85l-9.9-9.9 1.414-1.414 9.9 9.9-1.414 1.414zM4.961 50.288a.999.999 0 0 0-1.414 0l-.757.757 2.554-10.728 4.422-.491-.569 5.122c-.004.038.01.073.01.11 0 .038-.014.072-.01.11.004.033.021.06.028.092a1.016 1.016 0 0 0 .245.473c.048.051.1.094.157.134.045.031.088.06.138.084.066.031.135.049.207.066.038.009.069.03.108.035a.982.982 0 0 0 .109.006h.004a.995.995 0 0 0 .109-.006l5.122-.569-.491 4.422-10.729 2.554.757-.757a1 1 0 0 0 0-1.414zm12.55-5.479L39.889 22.43a.999.999 0 1 0-1.414-1.414L16.097 43.395l-4.773.53.53-4.773 22.38-22.378a.999.999 0 1 0-1.414-1.414L10.44 37.738l-3.183.354L34.94 10.409l9.9 9.9-27.683 27.683.354-3.183zm31.571-28.742l-9.9-9.9 1.415-1.415 9.9 9.9-1.415 1.415z" fill="#cacbce"></path>\n                                            </svg>\n                                            Edit\n                                        </a>\n                                    </li>\n                                    <li>\n                                        <a class="js-clone-interaction" data-interaction-name="' + data.interation_name + '" data-interaction-id="' + data.interation_id + '">\n                                            <svg viewBox="0 0 512 512" class="icon datatable__icon up-status">\n                                                <path d="M439.449 51.2h-81.8l-43.8-46.5c0-.1-.1-.1-.2-.1l-.6-.6c-.2-.1-.3-.3-.5-.4-.2-.2-.5-.4-.7-.6-.2-.1-.3-.2-.5-.3l-.9-.6c-.1-.1-.2-.2-.4-.2l-1.2-.6c-.1 0-.1-.1-.2-.1-1.6-.8-3.6-1.2-5.7-1.2h-230.3c-8.3 0-15 6.7-15 15v430.8c0 8.3 6.7 15 15 15h38.6V497c0 8.3 6.7 15 15 15h313.1c8.3 0 15-6.7 15-15V66.2c.1-8.3-6.6-15-14.9-15zm-121.5 1.6l33.1 35.1h-33.1V52.8zm-230.3 378V30h200.3v72.9c0 8.3 6.7 15 15 15h67.9v312.9h-283.2zm53.6 51.2v-21.2h244.5c8.3 0 15-6.7 15-15V102.9c0-.5 0-1-.1-1.5 0-.2-.1-.5-.1-.7s-.1-.5-.1-.7c-.1-.3-.1-.6-.2-.8 0-.2-.1-.4-.1-.6-.1-.3-.2-.6-.3-.8s-.1-.3-.2-.5c-.1-.3-.2-.5-.4-.8-.1-.2-.2-.4-.3-.5-.1-.2-.3-.5-.4-.7l-.3-.6c-.1-.2-.3-.4-.4-.6-.1-.2-.3-.4-.4-.6-.1-.2-.3-.4-.5-.5-.1-.1-.2-.3-.3-.4l-10.8-11.5h38.5V482h-283.1z"></path>\n                                            </svg>\n                                            Clone\n                                        </a>\n                                    </li>\n                                    <li>\n                                        <a href="#Reports">\n                                            <svg viewBox="0 0 60 60" class="icon datatable__icon up-status">\n                                                <path d="M36.719 22h-25a1 1 0 0 0 0 2h25a1 1 0 0 0 0-2zm-25-6h10a1 1 0 0 0 0-2h-10a1 1 0 0 0 0 2zm25 14h-25a1 1 0 0 0 0 2h25a1 1 0 0 0 0-2zm-8 8h-17a1 1 0 0 0 0 2h17a1 1 0 0 0 0-2zm-3 10a1 1 0 0 0 0-2h-14a1 1 0 0 0 0 2h14z"></path>\n                                                <path d="M2.719 2h29v14h14v18h2V14.586L33.133 0H.719v60h29v-2h-27V2zm31 1.414L44.305 14H33.719V3.414z"></path>\n                                                <path d="M58.407 37.162l-2.849-2.85c-1.128-1.128-3.094-1.128-4.222 0l-15.391 15.39-2.121 7.779-.519.519a.998.998 0 0 0-.006 1.405l-.005.02.02-.005a.997.997 0 0 0 1.405-.006l.519-.519 7.779-2.121 15.39-15.391c.564-.564.875-1.313.875-2.111s-.311-1.547-.875-2.11zm-20.153 13.06l10.243-10.243 4.243 4.243-10.243 10.243-4.243-4.243zm-.903 1.925l3.22 3.22-4.427 1.207 1.207-4.427zm19.642-12.178l-2.839 2.839-4.243-4.243 2.839-2.839a1.008 1.008 0 0 1 1.393 0l2.85 2.85a.985.985 0 0 1 0 1.393z"></path>\n                                            </svg>\n                                            Reports\n                                        </a>\n                                    </li>\n                                    <li>\n                                        <a class="js-change-interaction-status" data-interaction-name="' + data.interation_name + '" data-interaction-id="' + data.interation_id + '" data-campaign-id="' + data.campaign_id + '" data-status-id="4">\n                                            <svg viewBox="0 0 235.592 235.592" class="icon datatable__icon up-status">\n                                                <path d="M117.795.002C52.843.002 0 52.844 0 117.795 0 182.747 52.843 235.59 117.795 235.59c64.953 0 117.797-52.843 117.797-117.795C235.592 52.844 182.748.002 117.795.002zm0 220.588C61.113 220.59 15 174.477 15 117.795 15 61.114 61.113 15.002 117.795 15.002c56.683 0 102.797 46.112 102.797 102.793 0 56.682-46.115 102.795-102.797 102.795z"></path>\n                                                <path d="M139.834 68.258a7.499 7.499 0 0 0-7.5 7.5v84.076c0 4.143 3.357 7.5 7.5 7.5s7.5-3.357 7.5-7.5V75.758c0-4.143-3.357-7.5-7.5-7.5zm-44.076 0a7.499 7.499 0 0 0-7.5 7.5v84.076c0 4.143 3.357 7.5 7.5 7.5s7.5-3.357 7.5-7.5V75.758a7.5 7.5 0 0 0-7.5-7.5z"></path>\n                                            </svg>\n                                            Pause\n                                        </a>\n                                    </li>\n                                    <li>\n                                        <a href="#Play">\n                                            <svg viewBox="0 0 612.1 612.1" class="icon datatable__icon up-status">\n                                                <path d="M306 0a306 306 0 1 0 0 612 306 306 0 0 0 0-612zm0 582.4c-152.2 0-276.3-124.1-276.3-276.3S153.8 29.7 306 29.7 582.4 154 582.4 306.1 459.1 582.4 306 582.4zm119.4-297.2c-.8 0-.8-.8-1.7-.8L254 186.7a31 31 0 0 0-16-4.9c-11.2 0-23.2 8.9-23.2 28v192.3c.8 19.2 12 28 24 28 5.6 0 11.2-1.6 16.8-4.8l162.6-93.7c12-6.4 17.7-15.2 18.4-24.9.9-3.8-.7-13.5-11.1-21.5zm-181 113V215.5l157.8 91.3-157.9 91.4z" fill="#cacbce"></path>\n                                            </svg>\n                                            Play\n                                        </a>\n                                    </li>\n                                    <li>\n                                        <a class="js-change-interaction-status" data-interaction-name="' + data.interation_name + '" data-interaction-id="' + data.interation_id + '" data-campaign-id="' + data.campaign_id + '" data-status-id="2">\n                                            <svg viewBox="0 0 512 512" id="archive" class="icon datatable__icon up-status">\n                                                <path d="M312.461 332.734H199.539c-8.511 0-15.434 6.923-15.434 15.434v34.634c0 8.511 6.923 15.435 15.434 15.435h112.923c8.511 0 15.435-6.923 15.435-15.435v-34.634c-.002-8.51-6.925-15.434-15.436-15.434zm-4.41 45.659H203.948v-25.814h104.103v25.814z"></path>\n                                                <path d="M506.976 246.958l.159-.08L432.73 99.774c-6.015-11.89-18.025-19.275-31.346-19.275h-14.141V66.824c0-5.48-4.442-9.922-9.922-9.922H134.68c-5.48 0-9.922 4.442-9.922 9.922v13.675h-14.141c-13.321 0-25.331 7.385-31.346 19.275L4.865 246.878l.159.08A34.54 34.54 0 0 0 0 264.939v155.409c0 19.162 15.59 34.751 34.752 34.751h442.497c19.162 0 34.751-15.59 34.751-34.751V264.939a34.54 34.54 0 0 0-5.024-17.981zm-119.734-144.41h14.141a13.02 13.02 0 0 1 11.671 7.179l60.93 120.462h-41.431v-37.066c0-5.48-4.442-9.922-9.922-9.922h-12.275v-53.227c0-5.48-4.442-9.922-9.922-9.922h-13.192v-17.504zm25.468 100.496v27.144h-52.359a22.925 22.925 0 0 0-20.865 13.482l-14.296 31.71a.841.841 0 0 1-.764.493H187.575a.84.84 0 0 1-.764-.494l-14.295-31.708a22.926 22.926 0 0 0-20.866-13.483H99.291v-27.144H412.71zM144.602 76.746h222.796v43.305H144.602V76.746zm245.91 63.149V183.2H121.488v-43.305h269.024zM98.946 109.727a13.017 13.017 0 0 1 11.671-7.179h14.141v17.503h-13.192c-5.48 0-9.922 4.442-9.922 9.922V183.2H89.369c-5.48 0-9.922 4.442-9.922 9.922v37.066H38.016l60.93-120.461zm378.303 323.322H34.752c-7.004 0-12.703-5.699-12.703-12.701V264.939c0-7.003 5.698-12.701 12.703-12.701H151.65c.328 0 .629.194.765.495l14.295 31.708a22.923 22.923 0 0 0 20.865 13.481h136.85a22.924 22.924 0 0 0 20.865-13.48l14.296-31.709v-.001a.84.84 0 0 1 .764-.494h116.898c7.004 0 12.701 5.699 12.701 12.701v155.409h.001c.001 7.004-5.697 12.701-12.701 12.701z"></path>\n                                            </svg>\n                                            Archive\n                                        </a>\n                                    </li>\n                                    <li>\n                                        <a class="js-delete-interaction" data-interaction-id="' + data.interation_id + '" data-interaction-name="' + data.interation_name + '">\n                                            <svg viewBox="0 0 512 512" id="trash" class="icon datatable__icon">\n                                                <path d="M465.423 48.241h-137.61V23.955C327.813 10.746 317.082 0 303.893 0h-95.785c-13.19 0-23.92 10.746-23.92 23.955V48.24H46.577c-6.655 0-12.049 5.394-12.049 12.049 0 6.655 5.394 12.049 12.049 12.049h22.332l15.228 396.396A44.858 44.858 0 0 0 129.099 512h253.804a44.855 44.855 0 0 0 44.96-43.267l15.228-396.396h22.332c6.653 0 12.049-5.394 12.049-12.049 0-6.653-5.394-12.047-12.049-12.047zM208.285 24.097h95.43V48.24h-95.43V24.097zm195.499 443.712a20.833 20.833 0 0 1-20.882 20.094H129.099a20.835 20.835 0 0 1-20.882-20.095L93.025 72.338h325.952l-15.193 395.471z" fill="#cacbce"></path>\n                                                <path d="M182.63 181.571c-.127-6.575-5.494-11.817-12.042-11.817-.078 0-.158 0-.236.002-6.652.128-11.943 5.626-11.815 12.278l3.781 196.634c.126 6.575 5.495 11.817 12.042 11.817.078 0 .158 0 .236-.002 6.653-.128 11.943-5.624 11.815-12.278l-3.781-196.634zm73.368-11.818c-6.654 0-12.049 5.394-12.049 12.049v196.634c0 6.654 5.394 12.049 12.049 12.049 6.655 0 12.049-5.394 12.049-12.049V181.802c0-6.654-5.394-12.049-12.049-12.049zm85.647.003c-6.628-.147-12.151 5.162-12.278 11.815l-3.781 196.634c-.129 6.653 5.162 12.15 11.815 12.278l.236.002c6.546 0 11.916-5.244 12.042-11.817l3.781-196.634c.128-6.654-5.161-12.151-11.815-12.278z" fill="#cacbce"></path>\n                                            </svg>\n                                            Delete\n                                        </a>\n                                    </li>\n                                </ul>';
                },
                // className: 'dropdown-trigger--pointer js-actions-dropdown-trigger',
                bSortable: false,
                "sClass": 'dropdown-trigger--pointer js-actions-dropdown-trigger'
            }]
        });
        initDatatable({
            id: '#chatbots',
            url: getChatbotsUrl(),
            columns: [{ data: 'prop_chatbot_name' }, { data: 'prop_chatbot_status' }, { data: 'prop_chatbot_budget' }, { data: null }, { data: null }, { data: null }],
            aoColumnDefs: [{
                "aTargets": [1],
                "mData": null,
                "mRender": function mRender(data, type, full) {
                    return '<div class="datatable-status-badge datatable-status-badge--' + full.status_color + '">' + full.status_name + '</div>';
                }
            }, {
                "aTargets": [5],
                "mData": null,
                "mRender": function mRender(data, type, full) {
                    return '<div class="icon-kebab"><span></span></div>\n                                <ul class="dropdown-content dropdown-content--bottom">\n                                    <li>\n                                        <a href="/chatbot/update/' + data.id_chatbot + '">\n                                            <svg viewBox="0 0 55.25 55.25" class="icon datatable__icon">\n                                                <path d="M52.618 2.631c-3.51-3.508-9.219-3.508-12.729 0L3.827 38.693c-.017.017-.027.038-.042.056-.021.024-.039.05-.058.076a.972.972 0 0 0-.125.239c-.009.026-.022.049-.029.075l-.012.03-3.535 14.85a.991.991 0 0 0-.022.202c0 .013-.004.025-.004.038a.995.995 0 0 0 .095.403c.049.107.11.21.196.296a1.006 1.006 0 0 0 .938.266l14.85-3.535c.027-.006.051-.021.077-.03a.985.985 0 0 0 .3-.162c.024-.019.049-.033.072-.054.008-.008.018-.012.026-.02L52.617 15.36c3.51-3.51 3.51-9.22.001-12.729zm-1.414 1.414c2.488 2.489 2.7 6.397.65 9.137l-9.787-9.787c2.741-2.05 6.649-1.838 9.137.65zm-4.95 14.85l-9.9-9.9 1.414-1.414 9.9 9.9-1.414 1.414zM4.961 50.288a.999.999 0 0 0-1.414 0l-.757.757 2.554-10.728 4.422-.491-.569 5.122c-.004.038.01.073.01.11 0 .038-.014.072-.01.11.004.033.021.06.028.092a1.016 1.016 0 0 0 .245.473c.048.051.1.094.157.134.045.031.088.06.138.084.066.031.135.049.207.066.038.009.069.03.108.035a.982.982 0 0 0 .109.006h.004a.995.995 0 0 0 .109-.006l5.122-.569-.491 4.422-10.729 2.554.757-.757a1 1 0 0 0 0-1.414zm12.55-5.479L39.889 22.43a.999.999 0 1 0-1.414-1.414L16.097 43.395l-4.773.53.53-4.773 22.38-22.378a.999.999 0 1 0-1.414-1.414L10.44 37.738l-3.183.354L34.94 10.409l9.9 9.9-27.683 27.683.354-3.183zm31.571-28.742l-9.9-9.9 1.415-1.415 9.9 9.9-1.415 1.415z" fill="#cacbce"></path>\n                                            </svg>\n                                            Edit\n                                        </a>\n                                    </li>\n                                    <li>\n                                        <a class="js-get-chatbot-code" data-chatbot-id="' + data.id_chatbot + '">\n                                            <svg viewBox="0 0 55.25 55.25" class="icon datatable__icon">\n                                                <path d="M52.618 2.631c-3.51-3.508-9.219-3.508-12.729 0L3.827 38.693c-.017.017-.027.038-.042.056-.021.024-.039.05-.058.076a.972.972 0 0 0-.125.239c-.009.026-.022.049-.029.075l-.012.03-3.535 14.85a.991.991 0 0 0-.022.202c0 .013-.004.025-.004.038a.995.995 0 0 0 .095.403c.049.107.11.21.196.296a1.006 1.006 0 0 0 .938.266l14.85-3.535c.027-.006.051-.021.077-.03a.985.985 0 0 0 .3-.162c.024-.019.049-.033.072-.054.008-.008.018-.012.026-.02L52.617 15.36c3.51-3.51 3.51-9.22.001-12.729zm-1.414 1.414c2.488 2.489 2.7 6.397.65 9.137l-9.787-9.787c2.741-2.05 6.649-1.838 9.137.65zm-4.95 14.85l-9.9-9.9 1.414-1.414 9.9 9.9-1.414 1.414zM4.961 50.288a.999.999 0 0 0-1.414 0l-.757.757 2.554-10.728 4.422-.491-.569 5.122c-.004.038.01.073.01.11 0 .038-.014.072-.01.11.004.033.021.06.028.092a1.016 1.016 0 0 0 .245.473c.048.051.1.094.157.134.045.031.088.06.138.084.066.031.135.049.207.066.038.009.069.03.108.035a.982.982 0 0 0 .109.006h.004a.995.995 0 0 0 .109-.006l5.122-.569-.491 4.422-10.729 2.554.757-.757a1 1 0 0 0 0-1.414zm12.55-5.479L39.889 22.43a.999.999 0 1 0-1.414-1.414L16.097 43.395l-4.773.53.53-4.773 22.38-22.378a.999.999 0 1 0-1.414-1.414L10.44 37.738l-3.183.354L34.94 10.409l9.9 9.9-27.683 27.683.354-3.183zm31.571-28.742l-9.9-9.9 1.415-1.415 9.9 9.9-1.415 1.415z" fill="#cacbce"></path>\n                                            </svg>\n                                            Code\n                                        </a>\n                                    </li>\n                                    <li>\n                                        <a class="js-clone-chatbot" data-chatbot-name="' + data.prop_chatbot_name + '" data-chatbot-id="' + data.id_chatbot + '">\n                                            <svg viewBox="0 0 512 512" class="icon datatable__icon up-status">\n                                                <path d="M439.449 51.2h-81.8l-43.8-46.5c0-.1-.1-.1-.2-.1l-.6-.6c-.2-.1-.3-.3-.5-.4-.2-.2-.5-.4-.7-.6-.2-.1-.3-.2-.5-.3l-.9-.6c-.1-.1-.2-.2-.4-.2l-1.2-.6c-.1 0-.1-.1-.2-.1-1.6-.8-3.6-1.2-5.7-1.2h-230.3c-8.3 0-15 6.7-15 15v430.8c0 8.3 6.7 15 15 15h38.6V497c0 8.3 6.7 15 15 15h313.1c8.3 0 15-6.7 15-15V66.2c.1-8.3-6.6-15-14.9-15zm-121.5 1.6l33.1 35.1h-33.1V52.8zm-230.3 378V30h200.3v72.9c0 8.3 6.7 15 15 15h67.9v312.9h-283.2zm53.6 51.2v-21.2h244.5c8.3 0 15-6.7 15-15V102.9c0-.5 0-1-.1-1.5 0-.2-.1-.5-.1-.7s-.1-.5-.1-.7c-.1-.3-.1-.6-.2-.8 0-.2-.1-.4-.1-.6-.1-.3-.2-.6-.3-.8s-.1-.3-.2-.5c-.1-.3-.2-.5-.4-.8-.1-.2-.2-.4-.3-.5-.1-.2-.3-.5-.4-.7l-.3-.6c-.1-.2-.3-.4-.4-.6-.1-.2-.3-.4-.4-.6-.1-.2-.3-.4-.5-.5-.1-.1-.2-.3-.3-.4l-10.8-11.5h38.5V482h-283.1z"></path>\n                                            </svg>\n                                            Clone\n                                        </a>\n                                    </li>\n                                    <li>\n                                        <a href="#Reports">\n                                            <svg viewBox="0 0 60 60" class="icon datatable__icon up-status">\n                                                <path d="M36.719 22h-25a1 1 0 0 0 0 2h25a1 1 0 0 0 0-2zm-25-6h10a1 1 0 0 0 0-2h-10a1 1 0 0 0 0 2zm25 14h-25a1 1 0 0 0 0 2h25a1 1 0 0 0 0-2zm-8 8h-17a1 1 0 0 0 0 2h17a1 1 0 0 0 0-2zm-3 10a1 1 0 0 0 0-2h-14a1 1 0 0 0 0 2h14z"></path>\n                                                <path d="M2.719 2h29v14h14v18h2V14.586L33.133 0H.719v60h29v-2h-27V2zm31 1.414L44.305 14H33.719V3.414z"></path>\n                                                <path d="M58.407 37.162l-2.849-2.85c-1.128-1.128-3.094-1.128-4.222 0l-15.391 15.39-2.121 7.779-.519.519a.998.998 0 0 0-.006 1.405l-.005.02.02-.005a.997.997 0 0 0 1.405-.006l.519-.519 7.779-2.121 15.39-15.391c.564-.564.875-1.313.875-2.111s-.311-1.547-.875-2.11zm-20.153 13.06l10.243-10.243 4.243 4.243-10.243 10.243-4.243-4.243zm-.903 1.925l3.22 3.22-4.427 1.207 1.207-4.427zm19.642-12.178l-2.839 2.839-4.243-4.243 2.839-2.839a1.008 1.008 0 0 1 1.393 0l2.85 2.85a.985.985 0 0 1 0 1.393z"></path>\n                                            </svg>\n                                            Reports\n                                        </a>\n                                    </li>\n                                    <li>\n                                        <a class="js-change-chatbot-status" data-chatbot-name="' + data.prop_chatbot_name + '" data-chatbot-id="' + data.id_chatbot + '" data-owner-interaction-id="' + data.prop_chatbot_owner_interaction + '" data-owner-campaign-id="' + data.prop_chatbot_owner_campaign + '" data-status-id="4">\n                                            <svg viewBox="0 0 235.592 235.592" class="icon datatable__icon up-status">\n                                                <path d="M117.795.002C52.843.002 0 52.844 0 117.795 0 182.747 52.843 235.59 117.795 235.59c64.953 0 117.797-52.843 117.797-117.795C235.592 52.844 182.748.002 117.795.002zm0 220.588C61.113 220.59 15 174.477 15 117.795 15 61.114 61.113 15.002 117.795 15.002c56.683 0 102.797 46.112 102.797 102.793 0 56.682-46.115 102.795-102.797 102.795z"></path>\n                                                <path d="M139.834 68.258a7.499 7.499 0 0 0-7.5 7.5v84.076c0 4.143 3.357 7.5 7.5 7.5s7.5-3.357 7.5-7.5V75.758c0-4.143-3.357-7.5-7.5-7.5zm-44.076 0a7.499 7.499 0 0 0-7.5 7.5v84.076c0 4.143 3.357 7.5 7.5 7.5s7.5-3.357 7.5-7.5V75.758a7.5 7.5 0 0 0-7.5-7.5z"></path>\n                                            </svg>\n                                            Pause\n                                        </a>\n                                    </li>\n                                    <li>\n                                        <a href="#Play">\n                                            <svg viewBox="0 0 612.1 612.1" class="icon datatable__icon up-status">\n                                                <path d="M306 0a306 306 0 1 0 0 612 306 306 0 0 0 0-612zm0 582.4c-152.2 0-276.3-124.1-276.3-276.3S153.8 29.7 306 29.7 582.4 154 582.4 306.1 459.1 582.4 306 582.4zm119.4-297.2c-.8 0-.8-.8-1.7-.8L254 186.7a31 31 0 0 0-16-4.9c-11.2 0-23.2 8.9-23.2 28v192.3c.8 19.2 12 28 24 28 5.6 0 11.2-1.6 16.8-4.8l162.6-93.7c12-6.4 17.7-15.2 18.4-24.9.9-3.8-.7-13.5-11.1-21.5zm-181 113V215.5l157.8 91.3-157.9 91.4z" fill="#cacbce"></path>\n                                            </svg>\n                                            Play\n                                        </a>\n                                    </li>\n                                    <li>\n                                        <a class="js-change-chatbot-status" data-chatbot-name="' + data.prop_chatbot_name + '" data-chatbot-id="' + data.id_chatbot + '" data-owner-interaction-id="' + data.prop_chatbot_owner_interaction + '" data-owner-campaign-id="' + data.prop_chatbot_owner_campaign + '" data-status-id="2">\n                                            <svg viewBox="0 0 512 512" id="archive" class="icon datatable__icon up-status">\n                                                <path d="M312.461 332.734H199.539c-8.511 0-15.434 6.923-15.434 15.434v34.634c0 8.511 6.923 15.435 15.434 15.435h112.923c8.511 0 15.435-6.923 15.435-15.435v-34.634c-.002-8.51-6.925-15.434-15.436-15.434zm-4.41 45.659H203.948v-25.814h104.103v25.814z"></path>\n                                                <path d="M506.976 246.958l.159-.08L432.73 99.774c-6.015-11.89-18.025-19.275-31.346-19.275h-14.141V66.824c0-5.48-4.442-9.922-9.922-9.922H134.68c-5.48 0-9.922 4.442-9.922 9.922v13.675h-14.141c-13.321 0-25.331 7.385-31.346 19.275L4.865 246.878l.159.08A34.54 34.54 0 0 0 0 264.939v155.409c0 19.162 15.59 34.751 34.752 34.751h442.497c19.162 0 34.751-15.59 34.751-34.751V264.939a34.54 34.54 0 0 0-5.024-17.981zm-119.734-144.41h14.141a13.02 13.02 0 0 1 11.671 7.179l60.93 120.462h-41.431v-37.066c0-5.48-4.442-9.922-9.922-9.922h-12.275v-53.227c0-5.48-4.442-9.922-9.922-9.922h-13.192v-17.504zm25.468 100.496v27.144h-52.359a22.925 22.925 0 0 0-20.865 13.482l-14.296 31.71a.841.841 0 0 1-.764.493H187.575a.84.84 0 0 1-.764-.494l-14.295-31.708a22.926 22.926 0 0 0-20.866-13.483H99.291v-27.144H412.71zM144.602 76.746h222.796v43.305H144.602V76.746zm245.91 63.149V183.2H121.488v-43.305h269.024zM98.946 109.727a13.017 13.017 0 0 1 11.671-7.179h14.141v17.503h-13.192c-5.48 0-9.922 4.442-9.922 9.922V183.2H89.369c-5.48 0-9.922 4.442-9.922 9.922v37.066H38.016l60.93-120.461zm378.303 323.322H34.752c-7.004 0-12.703-5.699-12.703-12.701V264.939c0-7.003 5.698-12.701 12.703-12.701H151.65c.328 0 .629.194.765.495l14.295 31.708a22.923 22.923 0 0 0 20.865 13.481h136.85a22.924 22.924 0 0 0 20.865-13.48l14.296-31.709v-.001a.84.84 0 0 1 .764-.494h116.898c7.004 0 12.701 5.699 12.701 12.701v155.409h.001c.001 7.004-5.697 12.701-12.701 12.701z"></path>\n                                            </svg>\n                                            Archive\n                                        </a>\n                                    </li>\n                                    <li>\n                                        <a class="js-delete-chatbot" data-chatbot-id="' + data.id_chatbot + '" data-chatbot-name="' + data.prop_chatbot_name + '">\n                                            <svg viewBox="0 0 512 512" id="trash" class="icon datatable__icon">\n                                                <path d="M465.423 48.241h-137.61V23.955C327.813 10.746 317.082 0 303.893 0h-95.785c-13.19 0-23.92 10.746-23.92 23.955V48.24H46.577c-6.655 0-12.049 5.394-12.049 12.049 0 6.655 5.394 12.049 12.049 12.049h22.332l15.228 396.396A44.858 44.858 0 0 0 129.099 512h253.804a44.855 44.855 0 0 0 44.96-43.267l15.228-396.396h22.332c6.653 0 12.049-5.394 12.049-12.049 0-6.653-5.394-12.047-12.049-12.047zM208.285 24.097h95.43V48.24h-95.43V24.097zm195.499 443.712a20.833 20.833 0 0 1-20.882 20.094H129.099a20.835 20.835 0 0 1-20.882-20.095L93.025 72.338h325.952l-15.193 395.471z" fill="#cacbce"></path>\n                                                <path d="M182.63 181.571c-.127-6.575-5.494-11.817-12.042-11.817-.078 0-.158 0-.236.002-6.652.128-11.943 5.626-11.815 12.278l3.781 196.634c.126 6.575 5.495 11.817 12.042 11.817.078 0 .158 0 .236-.002 6.653-.128 11.943-5.624 11.815-12.278l-3.781-196.634zm73.368-11.818c-6.654 0-12.049 5.394-12.049 12.049v196.634c0 6.654 5.394 12.049 12.049 12.049 6.655 0 12.049-5.394 12.049-12.049V181.802c0-6.654-5.394-12.049-12.049-12.049zm85.647.003c-6.628-.147-12.151 5.162-12.278 11.815l-3.781 196.634c-.129 6.653 5.162 12.15 11.815 12.278l.236.002c6.546 0 11.916-5.244 12.042-11.817l3.781-196.634c.128-6.654-5.161-12.151-11.815-12.278z" fill="#cacbce"></path>\n                                            </svg>\n                                            Delete\n                                        </a>\n                                    </li>\n                                </ul>';
                },
                // className: 'dropdown-trigger--pointer js-actions-dropdown-trigger',
                bSortable: false,
                "sClass": 'dropdown-trigger--pointer js-actions-dropdown-trigger'
            }]
        });

        $('body').on('click', '.js-change-campaign-status', changeCampaignStatus);
        $('body').on('click', '.js-change-interaction-status', changeInteractionStatus);
        $('body').on('click', '.js-change-chatbot-status', changeChatbotStatus);

        $('body').on('click', '.js-delete-user', function (event) {
            var tableId = this.closest('table').id;
            var tableUrl = this.closest('table').dataset.url;
            var email = this.dataset.email;
            var parentId = this.dataset.parentId;
            var userId = this.dataset.userId;
            var roleId = this.dataset.roleId;
            var data = {
                parent_id: parentId,
                role: roleId
            };
            (0, _sweetalert2.default)({
                title: 'Are you sure?',
                text: 'You will delete the user: ' + email,
                input: 'select',
                inputOptions: new Promise(function (resolve, reject) {
                    // get users by role
                    $.ajax({
                        // url: 'https://api.myjson.com/bins/8gjww',
                        url: '/api/get_users_for_delete',
                        type: 'get',
                        data: data,
                        contentType: 'application/x-www-form-urlencoded',
                        success: function success(data) {
                            var users = {};
                            for (var user in data) {
                                var id = data[user].id,
                                    name = data[user].u_fullname;
                                if (data.hasOwnProperty(user)) {
                                    if (id !== +userId) {
                                        users[id] = name;
                                    }
                                }
                            }
                            resolve(users);
                        },
                        error: function error(_error) {
                            // console.log(error);
                            (0, _sweetalert2.default)({
                                title: 'Error!',
                                text: _error.responseText,
                                type: 'error',
                                confirmButtonText: 'OK'
                            });
                            reject(_error);
                        }
                    });
                }),
                inputPlaceholder: 'Select user',
                showCancelButton: true,
                inputValidator: function inputValidator(export_user_id) {
                    var data = {
                        id: userId,
                        export_user_id: export_user_id
                    };
                    return new Promise(function (resolve) {
                        $.ajax({
                            url: '/api/user',
                            type: 'delete',
                            data: data,
                            contentType: 'application/x-www-form-urlencoded',
                            success: function success(data) {
                                (0, _sweetalert2.default)({
                                    position: 'top-end',
                                    type: 'success',
                                    title: 'Deleted',
                                    //toast: true,
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                updateDataTable('#' + tableId);
                            },
                            error: function error(_error2) {
                                if (xhr.status === 403) {
                                    (0, _sweetalert2.default)({
                                        type: 'error',
                                        title: 'Access Denied'
                                    });
                                } else {
                                    var err = JSON.parse(xhr.responseText);
                                    (0, _sweetalert2.default)({
                                        type: 'error',
                                        title: err.message
                                    });
                                }
                            }
                        });
                    });
                }
            });
        });
        $('body').on('click', '.js-delete-campaign', function (event) {
            var tableId = this.closest('table').id;
            var tableUrl = this.closest('table').dataset.url;
            var campaignId = this.dataset.campaignId;
            var campaignName = this.dataset.campaignName;

            (0, _sweetalert2.default)({
                title: 'Are you sure?',
                text: 'You will delete the campaign: ' + campaignName,
                type: 'warning',
                showCancelButton: 'true',
                confirmButtonColor: '#4c84ff',
                cancelButtonColor: '#f50023',
                confirmButtonText: 'Yes, delete it'
            }).then(function (response) {
                if (response.value === true) {
                    var data = {
                        id: campaignId
                    };
                    $.ajax({
                        url: '/api/campaign',
                        type: 'delete',
                        data: data,
                        contentType: 'application/x-www-form-urlencoded',
                        success: function success(data) {
                            (0, _sweetAlertsMixins.toast)({
                                type: 'success',
                                title: 'Deleted'
                            });
                            updateDataTable('#' + tableId);
                        },
                        error: function error(xhr, status, _error3) {
                            var err = JSON.parse(xhr.responseText);
                            (0, _sweetalert2.default)({
                                type: 'error',
                                title: err.message
                            });
                        }
                    });
                }
            }).catch(function (err) {
                return console.log(err);
            });
        });
        $('body').on('click', '.js-delete-interaction', function (event) {
            var tableId = this.closest('table').id;
            var tableUrl = this.closest('table').dataset.url;
            var interactionId = this.dataset.interactionId;
            var interactionName = this.dataset.interactionName;

            (0, _sweetalert2.default)({
                title: 'Are you sure?',
                text: 'You will delete the interaction: ' + interactionName,
                type: 'warning',
                showCancelButton: 'true',
                confirmButtonColor: '#4c84ff',
                cancelButtonColor: '#f50023',
                confirmButtonText: 'Yes, delete it'
            }).then(function (response) {
                if (response.value === true) {
                    var data = {
                        id: interactionId
                    };
                    $.ajax({
                        url: '/api/interaction',
                        type: 'delete',
                        data: data,
                        contentType: 'application/x-www-form-urlencoded',
                        success: function success(data) {
                            (0, _sweetAlertsMixins.toast)({
                                type: 'success',
                                title: 'Deleted'
                            });
                            updateDataTable('#' + tableId);
                        },
                        error: function error(xhr, status, _error4) {
                            var err = JSON.parse(xhr.responseText);
                            (0, _sweetalert2.default)({
                                type: 'error',
                                title: err.message
                            });
                        }
                    });
                }
            });
        });
        $('body').on('click', '.js-delete-chatbot', function (event) {
            var tableId = this.closest('table').id;
            var tableUrl = this.closest('table').dataset.url;
            var chatbotId = this.dataset.chatbotId;
            var chatbotName = this.dataset.chatbotName;

            (0, _sweetalert2.default)({
                title: 'Are you sure?',
                text: 'You will delete the chatbot: ' + chatbotName,
                type: 'warning',
                showCancelButton: 'true',
                confirmButtonColor: '#4c84ff',
                cancelButtonColor: '#f50023',
                confirmButtonText: 'Yes, delete it'
            }).then(function (response) {
                if (response.value === true) {
                    var data = {
                        id: chatbotId
                    };
                    $.ajax({
                        url: '/api/chatbot',
                        type: 'delete',
                        data: data,
                        contentType: 'application/x-www-form-urlencoded',
                        success: function success(data) {
                            (0, _sweetAlertsMixins.toast)({
                                type: 'success',
                                title: 'Deleted'
                            });
                            updateDataTable('#' + tableId);
                        },
                        error: function error(xhr, status, _error5) {
                            var err = JSON.parse(xhr.responseText);
                            (0, _sweetalert2.default)({
                                type: 'error',
                                title: err.message
                            });
                        }
                    });
                }
            });
        });

        $('body').on('click', '.js-clone-campaign', function (event) {
            var tableId = this.closest('table').id;
            var campaignId = this.dataset.campaignId;
            var campaignName = this.dataset.campaignName;

            (0, _sweetalert2.default)({
                title: 'Are you sure?',
                text: 'You will clone the campaign: ' + campaignName,
                type: 'warning',
                showCancelButton: 'true',
                confirmButtonColor: '#4c84ff',
                cancelButtonColor: '#f50023',
                confirmButtonText: 'Yes, clone it'
            }).then(function (response) {
                if (response.value === true) {
                    var data = {
                        id: campaignId
                    };
                    $.ajax({
                        url: '/api/clone/campaign',
                        type: 'POST',
                        data: data,
                        contentType: 'application/x-www-form-urlencoded',
                        success: function success(data) {
                            (0, _sweetAlertsMixins.toast)({
                                type: 'success',
                                title: 'Cloned'
                            });
                            updateDataTable('#' + tableId);
                        },
                        error: function error(xhr, status, _error6) {
                            var err = JSON.parse(xhr.responseText);
                            (0, _sweetalert2.default)({
                                type: 'error',
                                title: err.message
                            });
                        }
                    });
                }
            });
        });
        $('body').on('click', '.js-clone-interaction', function (event) {
            var tableId = this.closest('table').id;
            var interactionId = this.dataset.interactionId;
            var interactionName = this.dataset.interactionName;

            (0, _sweetalert2.default)({
                title: 'Are you sure?',
                text: 'You will clone the interaction: ' + interactionName,
                type: 'warning',
                showCancelButton: 'true',
                confirmButtonColor: '#4c84ff',
                cancelButtonColor: '#f50023',
                confirmButtonText: 'Yes, clone it'
            }).then(function (response) {
                if (response.value === true) {
                    var data = {
                        id: interactionId
                    };
                    $.ajax({
                        url: '/api/clone/interaction',
                        type: 'POST',
                        data: data,
                        contentType: 'application/x-www-form-urlencoded',
                        success: function success(data) {
                            (0, _sweetAlertsMixins.toast)({
                                type: 'success',
                                title: 'Cloned'
                            });
                            updateDataTable('#' + tableId);
                        },
                        error: function error(xhr, status, _error7) {
                            var err = JSON.parse(xhr.responseText);
                            (0, _sweetalert2.default)({
                                type: 'error',
                                title: err.message
                            });
                        }
                    });
                }
            });
        });
        $('body').on('click', '.js-clone-chatbot', function (event) {
            var tableId = this.closest('table').id;
            var chatbotId = this.dataset.chatbotId;
            var chatbotName = this.dataset.chatbotName;

            (0, _sweetalert2.default)({
                title: 'Are you sure?',
                text: 'You will clone the chatbot: ' + chatbotName,
                type: 'warning',
                showCancelButton: 'true',
                confirmButtonColor: '#4c84ff',
                cancelButtonColor: '#f50023',
                confirmButtonText: 'Yes, clone it'
            }).then(function (response) {
                if (response.value === true) {
                    var data = {
                        id: chatbotId
                    };
                    $.ajax({
                        url: '/api/clone/chatbot',
                        type: 'POST',
                        data: data,
                        contentType: 'application/x-www-form-urlencoded',
                        success: function success(data) {
                            (0, _sweetAlertsMixins.toast)({
                                type: 'success',
                                title: 'Cloned'
                            });
                            updateDataTable('#' + tableId);
                        },
                        error: function error(xhr, status, _error8) {
                            var err = JSON.parse(xhr.responseText);
                            (0, _sweetalert2.default)({
                                type: 'error',
                                title: err.message
                            });
                        }
                    });
                }
            });
        });

        $('body').on('click', '.js-get-chatbot-code', function (event) {
            var _this = this;
            var tableId = this.closest('table').id;
            var chatbotId = this.dataset.chatbotId;
            var chatbotName = this.dataset.chatbotName;

            var data = {
                chatbot_id: chatbotId
            };
            $.ajax({
                url: '/api/get_one_chatbot_by_id',
                type: 'GET',
                data: data,
                contentType: 'application/x-www-form-urlencoded',
                success: function success(data) {
                    // console.log(data);
                    // _this.dataset.clipboardText = data.prop_chatbot_script;
                    // $(_this).one();

                    (0, _sweetalert2.default)({
                        type: 'question',
                        title: 'Do you want to copy code?',
                        text: 'Click on "Copy code" to get it',
                        // inputPlaceholder: 'Type your message here...',
                        showCloseButton: true,
                        showCancelButton: true,
                        confirmButtonColor: '#4c84ff',
                        confirmButtonText: 'Copy code',
                        confirmButtonClass: 'js-clipboard'
                    }).then(function (result) {
                        if (result.value) {
                            new _clipboard2.default('.js-clipboard', {
                                text: function text(trigger) {
                                    var res = '<script>' + data.prop_chatbot_script.trim() + '</script>';
                                    trigger.setAttribute('data-clipboard-text', res);
                                    return trigger.getAttribute('data-clipboard-text');
                                }
                            });

                            (0, _sweetAlertsMixins.toast)({
                                type: 'success',
                                title: 'Copied to clipboard!'
                            });
                        }
                    });
                },
                error: function error(xhr, status, _error9) {
                    var err = JSON.parse(xhr.responseText);
                    (0, _sweetalert2.default)({
                        type: 'error',
                        title: err.message
                    });
                }
            });

            // const {value: text} = await swal({
            //     input: 'textarea',
            //     // inputPlaceholder: 'Type your message here...',
            //     showCancelButton: true,
            //     confirmButtonColor: '#4c84ff',
            //     confirmButtonText: 'Copy'
            // })
            //
            // if (text) {
            //     swalToast({
            //         type: 'success',
            //         title: 'Copied to clipboard!',
            //     });
            // }

            // swal({
            //     title: 'Are you sure?',
            //     text: `You will clone the chatbot: ${chatbotName}`,
            //     type: 'warning',
            //     showCancelButton: 'true',
            //     confirmButtonColor: '#4c84ff',
            //     cancelButtonColor: '#f50023',
            //     confirmButtonText: 'Yes, clone it'
            // }).then((response) => {
            //     if(response.value === true) {
            //         let data = {
            //             id: chatbotId
            //         };
            //         $.ajax({
            //             url: '/api/clone/chatbot',
            //             type: 'POST',
            //             data,
            //             contentType: 'application/x-www-form-urlencoded',
            //             success: (data) => {
            //                 swalToast({
            //                     type: 'success',
            //                     title: 'Cloned',
            //                 });
            //                 updateDataTable('#' + tableId);
            //             },
            //             error: function (xhr, status, error) {
            //                 let err = JSON.parse(xhr.responseText);
            //                 swal({
            //                     type: 'error',
            //                     title: err.message,
            //                 });
            //             }
            //         });
            //     }
            // })
        });$('.datatable thead th').on('click', 'input, select', function (event) {
            event.stopPropagation();
        });

        $('body').on('click', '.js-actions-dropdown-trigger', function (event) {
            $(this).toggleClass('dropdown-trigger');
        });

        $('body').on('click', function (event) {
            if (!event.target.closest('.js-actions-dropdown-trigger')) {
                // console.log(event);
                // actionsDropdown.removeClass('dropdown-trigger');
                $('.js-actions-dropdown-trigger').removeClass('dropdown-trigger');
            }
        });
        // table.columns('.not-ordering').orderable(false);

        // tableStatusesSelect.on('change', function (event) {
        //     $.fn.dataTable.ext.search.pop();
        //
        //     if (event.target.value !== 'archived') {
        //         $.fn.dataTable.ext.search.push(
        //             function( settings, data, dataIndex ) {
        //                 // console.log('settings', settings);
        //                 // console.log('data', data);
        //                 if (data.indexOf('Archived') > -1) {
        //                     return false;
        //                 }
        //
        //                 return true;
        //             }
        //         );
        //     }
        //
        //     table
        //         .columns( '.datatable-status' )
        //         .search( event.target.value, false, true, true )
        //         .draw();
        // });
    }
});

},{"./../../_scripts/sweet-alerts-mixins":20,"clipboard/dist/clipboard.min":2,"sweetalert2":5}],13:[function(require,module,exports){
'use strict';

require('./../../../node_modules/air-datepicker/dist/js/datepicker.min');

(function () {
    $.fn.datepicker.language['en'] = {
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        today: 'Today',
        clear: 'Clear',
        dateFormat: 'mm.dd.yyyy',
        timeFormat: 'hh:ii aa',
        firstDay: 1
    };

    $('.datepicker-here').datepicker({
        language: 'en',
        minDate: new Date(),
        onHide: function onHide(inst) {
            if (inst.el.id === 'start-date') {
                var selectedDate = inst.lastSelectedDate;
                // console.log('selectedDate', selectedDate);
                var endDatePicker = $('#end-date').datepicker().data('datepicker');
                endDatePicker.update('minDate', new Date(selectedDate));
            }
        }
    });
})(); // 'use strict';
//
// export default class Datepicker {
//   constructor() {
//     this.name = 'datepicker';
//     console.log('%s module', this.name.toLowerCase());
//   }
// }

},{"./../../../node_modules/air-datepicker/dist/js/datepicker.min":1}],14:[function(require,module,exports){
'use strict';

// 'use strict';
//
// export default class Header {
//   constructor() {
//     this.name = 'header';
//     console.log('%s module', this.name.toLowerCase());
//   }
// }

(function () {
    var winWidth = window.innerWidth;

    var toggleSidenavBtn = document.querySelector('.js-toggle-nav');
    var closeSidenavBtn = document.querySelector('.js-close-nav');

    toggleSidenavBtn && toggleSidenavBtn.addEventListener('click', function (event) {
        var navId = this.dataset.navId;
        var nav = document.getElementById(navId);

        if (winWidth > 1199) {
            this.classList.toggle('is-active');
        }
        nav.classList.toggle('is-toggle');
    });
    closeSidenavBtn && closeSidenavBtn.addEventListener('click', function (event) {
        var navId = this.dataset.navId;
        var nav = document.getElementById(navId);

        nav.classList.remove('is-toggle');
    });
})();

},{}],15:[function(require,module,exports){
'use strict';

// import throttle from './../../_scripts/throttle';

(function () {
    var winWidth = window.innerWidth;
    var sidenav = document.getElementById('sidenav');
    var body = document.body;

    if (winWidth > 1199) {

        var makeStickySidenav = function makeStickySidenav() {
            var sidenavOffsetTop = sidenav.getBoundingClientRect().top;

            if (sidenavOffsetTop < 0) {
                sidenav.classList.add('is-sticky');
            } else {
                sidenav.classList.remove('is-sticky');
            }
        };
        window.addEventListener('scroll', makeStickySidenav);
    }
})();

},{}],16:[function(require,module,exports){
'use strict';

require('./../../node_modules/validate-js/validate.js');

var editProfileForm = document.getElementById('edit-profile'),
    formElements = void 0; // 'use strict';
//
// export default class Signup {
//   constructor() {
//     this.name = 'signup';
//     console.log('%s module', this.name.toLowerCase());
//   }


if (editProfileForm) {
    formElements = Array.from(editProfileForm.elements);

    formElements.forEach(function (el) {
        el.addEventListener('change', function (event) {
            var target = event.target,
                parent = target.closest('.form-field');

            var validEl = document.createElement('div'),
                span = document.createElement('span');
            validEl.appendChild(span);
            validEl.classList.add('form-field__valid');

            var errorEl = document.createElement('div');
            errorEl.classList.add('form-field__error');

            if (target.id === 'email') {
                var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                if (re.test(target.value)) {
                    deleteErrors();

                    if (!parent.classList.contains('has-valid')) {
                        parent.querySelector('.form-field__wrapper').appendChild(validEl);

                        setTimeout(function () {
                            parent.classList.add('has-valid');
                        }, 50);
                    }
                } else {
                    deleteValids();

                    if (!parent.classList.contains('has-error')) {
                        parent.classList.add('has-error');
                        errorEl.textContent = 'The email field must contain a valid email address.';
                        parent.appendChild(errorEl);
                    }
                }
            }
            if (target.id === 'password') {
                var _re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
                if (_re.test(target.value)) {
                    deleteErrors();

                    if (!parent.classList.contains('has-valid')) {
                        parent.querySelector('.form-field__wrapper').appendChild(validEl);

                        setTimeout(function () {
                            parent.classList.add('has-valid');
                        }, 50);
                    }
                } else {
                    deleteValids();

                    if (!parent.classList.contains('has-error')) {
                        parent.classList.add('has-error');
                        errorEl.textContent = 'Password must contain at least 1 lowercase alphabetical character, at least 1 uppercase alphabetical character, at least 1 lowercase numeric character, at least 1 special character.';
                        parent.appendChild(errorEl);
                    }
                }
            }
            if (target.id === 'confirm-pass') {
                var pass = document.getElementById('password');

                if (pass.value === '') {
                    deleteValids();
                    return;
                }
                if (pass.value === target.value) {

                    deleteErrors();

                    if (!parent.classList.contains('has-valid')) {
                        parent.querySelector('.form-field__wrapper').appendChild(validEl);

                        setTimeout(function () {
                            parent.classList.add('has-valid');
                        }, 50);
                    }
                } else {
                    deleteValids();

                    if (!parent.classList.contains('has-error')) {
                        parent.classList.add('has-error');
                        errorEl.textContent = 'Password has been entered incorrectly';
                        parent.appendChild(errorEl);
                    }
                }
            }

            function deleteErrors() {
                var errorBlocks = parent.querySelectorAll('.form-field__error');
                errorBlocks.forEach(function (item) {
                    var e = item.closest('.has-error');
                    if (e) {
                        e.classList.remove('has-error');
                    }
                    item.remove();
                });
                parent.classList.remove('has-error');
            }
            function deleteValids() {
                var validBlocks = parent.querySelectorAll('.form-field__valid');
                validBlocks.forEach(function (item) {
                    var v = item.closest('.has-valid');
                    if (v) {
                        v.classList.remove('has-valid');
                    }
                    item.remove();
                });
                parent.classList.remove('has-valid');
            }
        });
    });

    var validator = new FormValidator("edit-profile", [{
        name: "fullName",
        display: 'full name',
        rules: "required"
    }, {
        name: "email",
        rules: "required|valid_email"
    }, {
        name: "password",
        rules: "required|min_length[8]|callback_strong_password"
    }, {
        name: "confirm-pass",
        display: "password confirmation",
        rules: "required|matches[password]"
    }], function (errors, event) {
        var form = event.target;
        // console.dir(form);

        var validBlocks = form.querySelectorAll('.form-field__valid');
        var errorBlocks = form.querySelectorAll('.form-field__error');

        validBlocks.forEach(function (item) {
            var v = item.closest('.has-valid');
            if (v) {
                v.classList.remove('has-valid');
            }
            item.remove();
        });
        errorBlocks.forEach(function (item) {
            var e = item.closest('.has-error');
            if (e) {
                e.classList.remove('has-error');
            }
            item.remove();
        });

        if (errors.length > 0) {
            // Show the errors
            console.log("errors ", errors);

            errors.forEach(function (error) {
                var el = error.element,
                    parent = el.closest('.form-field');

                parent.classList.add('has-error');
                var errorText = document.createElement('div');
                errorText.classList.add('form-field__error');
                errorText.textContent = error.message;
                parent.appendChild(errorText);
            });
        }
    });
    // let message = 'Password must contain ';
    validator.registerCallback('strong_password', function (value) {
        var regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            lcAlpha = /(?=.*[a-z])/,
            ucAlpha = /(?=.*[A-Z])/,
            num = /(?=.*[0-9])/,
            specialChar = /(?=.*[!@#\$%\^&\*])/;

        // if (!lcAlpha.test(value)) {
        //     message += 'at least 1 lowercase alphabetical character, '
        // }
        // if (!ucAlpha.test(value)) {
        //     message += 'at least 1 uppercase alphabetical character, '
        // }
        // if (!num.test(value)) {
        //     message += 'at least 1 lowercase numeric character, '
        // }
        // if (!specialChar.test(value)) {
        //     message += 'at least 1 special character.'
        // }

        if (regexp.test(value)) {
            return true;
        }

        return false;
    })
    // at least 8 characters, at least one special character, at least one capital letter, both letter and number.
    .setMessage('strong_password', 'Password must contain at least 1 lowercase alphabetical character, at least 1 uppercase alphabetical character, at least 1 lowercase numeric character, at least 1 special character.');
    // .setMessage('strong_password', 'Please choose a stronger password using at least 1 number.');
    // }
}

},{"./../../node_modules/validate-js/validate.js":6}],17:[function(require,module,exports){
// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

// import $ from 'jquery';
// import fc from '../../../node_modules/jquery.flowchart/jquery.flowchart';
// import * from '../../node_modules/jquery.flowchart/jquery.flowchart';
// import Link from '../_modules/link/link';
// import randomTo from './randomTo';
// import BalloonTooltip from './tooltip';

var _dataTables = require('../_modules/data-tables/data-tables');

var dataTables = _interopRequireWildcard(_dataTables);

require('./forms-validation');

require('../_modules/datepicker/datepicker');

require('../_modules/chatbot-builder/chatbot-builder');

require('./object-fit-polyfill');

require('../_modules/authorization/signup/signup');

require('../_modules/authorization/signin/signin');

require('../_modules/authorization/forgot-password/forgot-password');

require('../_modules/authorization/set-new-password/set-new-password');

require('../_modules/sidenav/sidenav');

require('../_modules/header/header');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// import * as morrisChart from '../_modules/analytics-charts/analytics-charts';

$(function () {
    // new Link(); // Activate Link modules logic

    // if ( $('#plotly').length ) {
    //     new Reports().init();
    // }
    console.log('Welcome to Yeogurt!');

    var numberInputs = Array.from(document.querySelectorAll('input[type="number"]'));
    numberInputs.forEach(function (input) {
        input.addEventListener('change', function (event) {
            var target = event.target,
                value = +target.value,
                min = target.min !== "" ? +target.min : undefined,
                max = target.max !== "" ? +target.max : undefined;

            if (min !== undefined) {
                if (value < min) {
                    value = target.value = target.min;
                }
            }
            if (max !== undefined) {
                if (value > max) {
                    value = target.value = target.max;
                }
            }
        });
    });
});

// _getOperatorFullElement
// _createSubConnector

$(function () {
    // $("#avatar").on("change", (function(e) {
    //     e.preventDefault();
    //     // Current File
    //     var file = e.target.files[0];
    //     // new form Data
    //     var form_data = new FormData();
    //     // input image name
    //     form_data.append('upimage', file);
    //     // Ajax
    //     $.ajax({
    //         url: '/admin/upload',
    //         type: 'post',
    //         enctype: 'multipart/form-data',
    //         data: form_data,
    //         processData: false,
    //         contentType: false,
    //         success: function(data) {
    //             console.log(data);
    //         },
    //         error: function(data) {
    //             console.log(data);
    //         }
    //     })
    // }));


});

},{"../_modules/authorization/forgot-password/forgot-password":7,"../_modules/authorization/set-new-password/set-new-password":8,"../_modules/authorization/signin/signin":9,"../_modules/authorization/signup/signup":10,"../_modules/chatbot-builder/chatbot-builder":11,"../_modules/data-tables/data-tables":12,"../_modules/datepicker/datepicker":13,"../_modules/header/header":14,"../_modules/sidenav/sidenav":15,"./forms-validation":16,"./object-fit-polyfill":18}],18:[function(require,module,exports){
"use strict";

(function () {
    var userAgent = void 0,
        ieReg = void 0,
        ie = void 0;
    userAgent = window.navigator.userAgent;
    ieReg = /msie|Trident.*rv[ :]*11\./gi;
    ie = ieReg.test(userAgent);

    if (ie) {
        $(".img-container").each(function () {
            var $container = $(this),
                imgUrl = $container.find("img").prop("src");
            if (imgUrl) {
                $container.css("backgroundImage", 'url(' + imgUrl + ')').addClass("object-fit-cover");
            }
        });
    }
})();

},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = randomTo;
function randomTo(number) {
    return Math.random() * number;
}
module.exports = exports["default"];

},{}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toast = undefined;

var _sweetalert = require('sweetalert2');

var _sweetalert2 = _interopRequireDefault(_sweetalert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toast = exports.toast = _sweetalert2.default.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    showCloseButton: true,
    timer: 6000
    // animation: false,
    // customClass: 'moda'
});
// export const ss = swal.mixin({
//     width: '400px',
//     heightAuto: false,
// });

},{"sweetalert2":5}],21:[function(require,module,exports){
"use strict";

String.prototype.toCamelCase = function () {
    return this.replace(/[-_]([a-zA-z])/g, function (match) {
        return match[1].toUpperCase();
    });
};

},{}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = BalloonTooltip;
function BalloonTooltip(opts) {
    this.el = opts.el || '';
    this.text = opts.text || '';
    this.position = opts.position || 'up';
    this.length = opts.length || 'small';
    this.visible = opts.visible || false;
}

BalloonTooltip.prototype.set = function () {
    var _this = this;

    this.el.setAttribute('data-balloon', this.text);
    this.el.setAttribute('data-balloon-pos', this.position);
    if (this.visible) {
        setTimeout(function () {
            _this.el.setAttribute('data-balloon-visible', '');
        }, 10);
    }
};
BalloonTooltip.prototype.delete = function () {
    this.el.removeAttribute('data-balloon');
    this.el.removeAttribute('data-balloon-pos');
    if (this.visible) {
        this.el.removeAttribute('data-balloon-visible');
    }
};
module.exports = exports['default'];

},{}]},{},[17])

//# sourceMappingURL=main.js.map
