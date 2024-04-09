import { registerBlockType } from '@wordpress/blocks';
import { useState, useEffect } from '@wordpress/element';

registerBlockType( 'featured-post/featured-post', {
    title: 'Featured Post',
    icon: 'megaphone',
    category: 'widgets',

    attributes: {
        selectedPosts: {
            type: 'array',
            default: null,
        },
        postTitles: {
            type: 'array',
            default: [],
        },
        postExcerpts: {
            type: 'array',
            default: [],
        },
    },

    edit: ( { attributes, setAttributes } ) => {
        const [posts, setPosts] = useState([]);
    
        useEffect(() => {
            fetch('/wp-json/featured-post/v1/selected-posts')
                .then(response => response.json())
                .then(data => {
                    setPosts(data);
                    if (data.length > 0) {
                        const selectedPosts = data.map(post => post.ID);
                        const postTitles = data.map(post => post.title.rendered);
                        const postExcerpts = data.map(post => post.excerpt.rendered);
                        setAttributes({ 
                            selectedPosts: attributes.selectedPosts || selectedPosts, 
                            postTitles: attributes.postTitles || postTitles, 
                            postExcerpts: attributes.postExcerpts || postExcerpts,
                        });
                    }
                })
                .catch(error => console.error('Error:', error));
        }, []);
    
        if ( ! posts ) {
            return 'Loading...';
        }
    
        if ( posts.length === 0 ) {
            return 'No posts';
        }
    
        return (
            <>
                {attributes.selectedPosts && attributes.selectedPosts.map(postId => {
                    const post = posts.find( post => post.ID === postId );
                    return (
                        <div key={postId}>
                            <h2>{ post.title.rendered }</h2>
                            <div dangerouslySetInnerHTML={ { __html: post.excerpt.rendered } } />
                        </div>
                    );
                })}
            </>
        );
    },

    save: ( { attributes } ) => {
        // Log the attributes object
        console.log(attributes);
    
        // Save a placeholder div for each selected post
        return (
            <div className="wp-block-featured-post-featured-post">
                {attributes.selectedPosts && attributes.selectedPosts.map(postId => (
                    <h2 className="featured-post">
                        {postId}
                        
                        <span className="post-title">Post Title</span>
                        <span className="post-excerpt">Post Excerpt</span>
                    </h2>
                ))}
            </div>
        );
    },
    
} );
