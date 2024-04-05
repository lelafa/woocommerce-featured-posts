    import { registerBlockType } from '@wordpress/blocks';
    import { useSelect } from '@wordpress/data';
    import { InspectorControls } from '@wordpress/block-editor';
    import { SelectControl } from '@wordpress/components';
    import { useState } from '@wordpress/element';


    
    registerBlockType( 'my-block/featured-post', {
        title: 'Featured Post',
        icon: 'megaphone',
        category: 'widgets',

        edit: ( { attributes, setAttributes } ) => {
            const selectedPosts = useSelect( select => {
                const { getEntityRecords } = select( 'core' );
                const fetch = window.fetch;
            
                // Fetch the selected posts from the custom REST API endpoint
                fetch( '/wp-json/featured-post/v1/selected-posts' )
                    .then( response => response.json() )
                    .then( posts => {
                        return posts.map( post => getEntityRecords( 'postType', 'post', post.ID ) );
                    } );
            
            }, [] );
        
            if ( ! selectedPosts ) {
                return 'Loading...';
            }
        
            if ( selectedPosts.length === 0 ) {
                return 'No posts';
            }
        
            const postOptions = selectedPosts.map( post => ( { value: post.id, label: post.title.rendered } ) );
        
            // Initialize selectedPost and block attributes with first post data
            if ( ! selectedPost && selectedPosts.length > 0 ) {
                const firstPost = selectedPosts[0];
                setSelectedPost( firstPost.id );
                if ( ! attributes.postTitle && ! attributes.postExcerpt ) {
                    setAttributes( { postTitle: firstPost.title.rendered, postExcerpt: firstPost.excerpt.rendered } );
                }
            }
        
            return (
                <>
                    <InspectorControls>
                        <SelectControl
                            label="Select a post"
                            value={ selectedPost }
                            options={ postOptions }
                            onChange={ ( postId ) => {
                                const post = selectedPosts.find( post => post.id === postId );
                                setSelectedPost( postId );
                                setAttributes( { postTitle: post.title.rendered, postExcerpt: post.excerpt.rendered } );
                            } }
                        />
                    </InspectorControls>
                    <div>
                        <h2>{ attributes.postTitle }</h2>
                        <div dangerouslySetInnerHTML={ { __html: attributes.postExcerpt } } />
                    </div>
                </>
            );
        },
        
        

        save: () => null,
    } );
