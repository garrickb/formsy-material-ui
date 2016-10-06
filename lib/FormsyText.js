'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _React$createClass;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var FormsyText = _react2.default.createClass((_React$createClass = {
  displayName: 'FormsyText',


  propTypes: {
    defaultValue: _react2.default.PropTypes.any,
    name: _react2.default.PropTypes.string.isRequired,
    onBlur: _react2.default.PropTypes.func,
    onChange: _react2.default.PropTypes.func,
    onKeyDown: _react2.default.PropTypes.func,
    validationError: _react2.default.PropTypes.string,
    validationErrors: _react2.default.PropTypes.object,
    validations: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.object]),
    updateImmediately: _react2.default.PropTypes.bool,
    value: _react2.default.PropTypes.any
  },

  mixins: [_formsyReact2.default.Mixin],

  getInitialState: function getInitialState() {
    return { value: this.controlledValue() };
  },
  componentWillMount: function componentWillMount() {
    this.setValue(this.controlledValue());
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var isValueChanging = nextProps.value !== this.props.value;
    if (isValueChanging || nextProps.defaultValue !== this.props.defaultValue) {
      var value = this.controlledValue(nextProps);
      if (isValueChanging || this.props.defaultValue === this.getValue()) {
        this.setState({ value: value });
        this.setValue(value);
      }
    }
  },
  componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
    if (nextState._isPristine && // eslint-disable-line no-underscore-dangle
    nextState._isPristine !== this.state._isPristine) {
      // eslint-disable-line no-underscore-dangle
      // Calling state here is valid, as it cannot cause infinite recursion.
      var value = this.controlledValue(nextProps);
      this.setValue(value);
      this.setState({ value: value });
    }
  },
  controlledValue: function controlledValue() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

    return props.value || props.defaultValue || '';
  }
}, _defineProperty(_React$createClass, 'componentWillReceiveProps', function componentWillReceiveProps(nextProps) {
  if (nextProps.value !== this.props.value) this.setState({
    value: nextProps.value
  });
}), _defineProperty(_React$createClass, 'handleBlur', function handleBlur(event) {
  this.setValue(event.currentTarget.value);
  delete this.changeValue;
  if (this.props.onBlur) this.props.onBlur(event);
}), _defineProperty(_React$createClass, 'handleChange', function handleChange(event) {
  // Update the value (and so display any error) after a timeout.
  if (this.props.updateImmediately) {
    if (!this.changeValue) {
      this.changeValue = (0, _utils.debounce)(this.setValue, 400);
    }
    this.changeValue(event.currentTarget.value);
  } else {
    // If there was an error (on loss of focus) update on each keypress to resolve same.
    if (this.getErrorMessage() != null) {
      this.setValue(event.currentTarget.value);
    } else {
      // Only update on valid values, so as to not generate an error until focus is lost.
      if (this.isValidValue(event.target.value)) {
        this.setValue(event.currentTarget.value);
        // If it becomes invalid, and there isn't an error message, invalidate without error.
      } else {
        this.resetValue();
      }
    }
  }

  // Controlled component
  if (this.props.onChange) {
    this.props.onChange(event, event.currentTarget.value);
    // Uncontrolled component
  } else {
    this.setState({
      value: event.currentTarget.value
    });
  }
}), _defineProperty(_React$createClass, 'handleKeyDown', function handleKeyDown(event) {
  if ((0, _keycode2.default)(event) === 'enter') this.setValue(event.currentTarget.value);
  if (this.props.onKeyDown) this.props.onKeyDown(event, event.currentTarget.value);
}), _defineProperty(_React$createClass, 'setMuiComponentAndMaybeFocus', _utils.setMuiComponentAndMaybeFocus), _defineProperty(_React$createClass, 'render', function render() {
  var _props = this.props;
  var defaultValue = _props.defaultValue;
  var validations = _props.validations;
  var validationError = _props.validationError;
  var validationErrors = _props.validationErrors;
  var onFocus = _props.onFocus;
  var value = _props.value;

  var rest = _objectWithoutProperties(_props, ['defaultValue', 'validations', 'validationError', 'validationErrors', 'onFocus', 'value']);

  return _react2.default.createElement(_TextField2.default, _extends({}, rest, {
    errorText: this.getErrorMessage(),
    onBlur: this.handleBlur,
    onChange: this.handleChange,
    onKeyDown: this.handleKeyDown,
    ref: this.setMuiComponentAndMaybeFocus,
    value: this.state.value
  }));
}), _React$createClass));

exports.default = FormsyText;