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
                    console.log(data)
                    if (data.length > 0) {
                        const selectedPosts = data.map(post => post.ID);
                        console.log(selectedPosts)
                        const postTitles = data.map(post => post.title);
                        console.log(postTitles)
                        const postExcerpts = data.map(post => post.excerpt);
                        console.log(postExcerpts)
                        setAttributes({
                            selectedPosts: selectedPosts,
                            postTitles: postTitles,
                            postExcerpts: postExcerpts,
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
    },
    
    save: ( { attributes } ) => {
        // Log the attributes object
        console.log(attributes);
        
        return (
            <div className="wp-block-featured-post-featured-post">
                {attributes.selectedPosts && attributes.selectedPosts.map((postId, index) => (
                    <div className="featured-post" key={postId}>
                        <h2 className="featured-post">
                            {postId}
                        </h2>
                        <span className="post-title">{attributes.postTitles[index]}</span>
                        <span className="post-excerpt">{attributes.postExcerpts[index]}</span>
                    </div>
                ))}
            </div>
        );
    },
    
} );
