module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order'],
  rules: {
    'declaration-colon-newline-after': null,
    'declaration-empty-line-before': null,
    'value-keyword-case': null,
    'order/properties-order': [
      [
        {
          groupName: 'general',
          properties: [
            'box-sizing',
            'float',
            'overflow',
            'overflow-x',
            'overflow-y',
            'content',
            'z-index'
          ],
          emptyLineBefore: 'always',
          noEmptyLineBetween: true
        },
        {
          groupName: 'position',
          properties: ['position', 'top', 'right', 'bottom', 'left'],
          emptyLineBefore: 'always',
          noEmptyLineBetween: true
        },
        {
          groupName: 'size',
          properties: [
            'width',
            'height',
            'min-width',
            'max-width',
            'min-height',
            'max-height'
          ],
          emptyLineBefore: 'always',
          noEmptyLineBetween: true
        },
        {
          groupName: 'display & flex',
          properties: [
            'display',
            'flex-direction',
            'flex-wrap',
            'flex',
            'flex-flow',
            'flex-grow',
            'flex-shrink',
            'flex-basis',
            'align-items',
            'justify-content',
            'text-align'
          ],
          emptyLineBefore: 'always',
          noEmptyLineBetween: true
        },
        {
          groupName: 'offset',
          properties: [
            'padding',
            'padding-top',
            'padding-right',
            'padding-bottom',
            'padding-left',
            'margin',
            'margin-top',
            'margin-right',
            'margin-bottom',
            'margin-left'
          ],
          emptyLineBefore: 'always',
          noEmptyLineBetween: true
        },
        {
          groupName: 'font',
          properties: [
            'font',
            'font-family',
            'font-size',
            'font-style',
            'font-weight',
            'line-height',
            'letter-spacing',
            'text-overflow',
            'text-decoration',
            'white-space',
            'word-break',
            'word-wrap'
          ],
          emptyLineBefore: 'always',
          noEmptyLineBetween: true
        },
        {
          groupName: 'color',
          properties: ['color', 'background-color', 'background'],
          emptyLineBefore: 'always',
          noEmptyLineBetween: true
        },
        {
          groupName: 'border',
          properties: [
            'border',
            'border-top',
            'border-right',
            'border-bottom',
            'border-left',
            'border-radius',
            'border-collapse'
          ],
          emptyLineBefore: 'always',
          noEmptyLineBetween: true
        }
      ],
      {
        unspecified: 'bottomAlphabetical',
        emptyLineBeforeUnspecified: 'always'
      }
    ],
    'value-list-comma-newline-after': null,
    'selector-class-pattern': null,
    'alpha-value-notation': 'number',
    'string-quotes': null, // enforced by prettier
    'color-function-notation': 'legacy',
    indentation: null // enforced by prettier
  }
};
