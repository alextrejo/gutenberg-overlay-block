class smrtOverlayBlock{
  static init() {
    const { registerBlockType } = wp.blocks;
    const { MediaUpload, InspectorControls, InnerBlocks } = wp.blockEditor;
    const { PanelBody, RangeControl, Button, ColorPalette } = wp.components;
    const { Fragment } = wp.element;
    const { __ } = wp.i18n;

    const svgIcon = React.createElement(
      'svg',
      { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 512 512', },
      React.createElement('path', {
        d: 'M0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6l96 0 32 0 208 0c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z',
      })
    );

    const opacityHex = (op) => {
      return (Math.ceil( op/100 *  255)).toString(16);
    }

    // Register the block
    registerBlockType( 'smrt/section-overlay', {
        title: __( 'Section with Overlay' ),
        icon: svgIcon,
        category: 'layout',
        
        attributes: {
            backgroundImage: {
                type: 'string',
                default: ''
            },
            backgroundImageId: {
                type: 'number'
            },
            overlayColor: {
                type: 'string',
                default: '#000000'
            },
            opacity: {
                type: 'number',
                default: 50
            },
            padding: {
                type: 'number',
                default: 60
            }
        },
        
        edit: function( props ) {
            const { attributes, setAttributes } = props;
            const { 
                backgroundImage, 
                backgroundImageId, 
                overlayColor, 
                opacity, 
                padding 
            } = attributes;
            
            // Section style
            const sectionStyle = {
                paddingTop: padding + 'px',
                paddingBottom: padding + 'px',
                backgroundImage: 'linear-gradient('+ overlayColor + opacityHex(opacity)  +','+ overlayColor + opacityHex(opacity)  +'),url('+ backgroundImage +')',
            };
                      
            return React.createElement(
                Fragment,
                null,
                // Inspector Controls
                React.createElement(
                    InspectorControls,
                    null,
                    React.createElement(
                        PanelBody,
                        { 
                            title: __( 'Section Settings' ),
                            initialOpen: true
                        },
                        // Background Image Control
                        React.createElement(
                            'div',
                            { className: 'editor-post-featured-image' },
                            React.createElement(
                                'p',
                                null,
                                __( 'Background Image' )
                            ),
                            !backgroundImageId && React.createElement(
                                MediaUpload,
                                {
                                    onSelect: function( media ) {
                                        setAttributes({
                                            backgroundImage: media.url,
                                            backgroundImageId: media.id
                                        });
                                    },
                                    type: 'image',
                                    value: backgroundImageId,
                                    render: function( obj ) {
                                        return React.createElement(
                                            Button,
                                            {
                                                className: 'button',
                                                onClick: obj.open
                                            },
                                            __( 'Choose Image' )
                                        );
                                    }
                                }
                            ),
                            backgroundImageId && React.createElement(
                                MediaUpload,
                                {
                                    onSelect: function( media ) {
                                        setAttributes({
                                            backgroundImage: media.url,
                                            backgroundImageId: media.id
                                        });
                                    },
                                    type: 'image',
                                    value: backgroundImageId,
                                    render: function( obj ) {
                                        return React.createElement(
                                            Button,
                                            {
                                                className: 'button',
                                                onClick: obj.open,
                                                style: { marginRight: '8px'}
                                            },
                                            __( 'Replace Image' )
                                        );
                                    }
                                }
                            ),
                            backgroundImageId && React.createElement(
                                Button,
                                {
                                    onClick: function() {
                                        setAttributes({
                                            backgroundImage: undefined,
                                            backgroundImageId: undefined
                                        });
                                    },
                                    isLink: true,
                                    isDestructive: true
                                },
                                __( 'Remove Image' )
                            )
                        ),
                        
                        // Overlay Color Control
                        React.createElement(
                            'div',
                            { className: 'components-base-control', style: { marginTop: '1em' } },
                            React.createElement(
                                'label',
                                { className: 'components-base-control__label' },
                                __( 'Overlay Color' )
                            ),
                            React.createElement(
                                ColorPalette,
                                {
                                    value: overlayColor,
                                    onChange: function( color ) {
                                        setAttributes({ overlayColor: color || '#000000' });
                                    }
                                }
                            )
                        ),
                        
                        // Opacity Control
                        React.createElement(
                            RangeControl,
                            {
                                label: __( 'Overlay Opacity' ),
                                value: opacity,
                                onChange: function( value ) {
                                    setAttributes({ opacity: value });
                                },
                                min: 0,
                                max: 100,
                                step: 1
                            }
                        ),
                        
                        // Padding Control
                        React.createElement(
                            RangeControl,
                            {
                                label: __( 'Padding (Top & Bottom)' ),
                                value: padding,
                                onChange: function( value ) {
                                    setAttributes({ padding: value });
                                },
                                min: 0,
                                max: 200,
                                step: 5
                            }
                        )
                    )
                ),
                
                // Block Preview
                React.createElement(
                        'section',
                        { style: sectionStyle, className: 'smrt-section-overlay' },
                        React.createElement(
                            InnerBlocks,
                            null
                        )
                )
            );
        },
        
        save: function( props ) {
            const { attributes } = props;
            const { 
                backgroundImage, 
                overlayColor, 
                opacity, 
                padding 
            } = attributes;
            
            // Section style
            const sectionStyle = {
              paddingTop: padding + 'px',
              paddingBottom: padding + 'px',
              backgroundImage: 'linear-gradient('+ overlayColor + opacityHex(opacity)  +','+ overlayColor + opacityHex(opacity)  +'),url('+ backgroundImage +')',
            };

            return React.createElement(
              'section',
              { style: sectionStyle, className: 'smrt-section-overlay' },
              React.createElement( InnerBlocks.Content, null )
          );
        }
    });
  }
}

smrtOverlayBlock.init();