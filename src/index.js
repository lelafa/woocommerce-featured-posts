import { registerBlockType } from '@wordpress/blocks';
import { useState, useEffect } from '@wordpress/element';

registerBlockType( 'featured-post/featured-post', {
    title: 'Featured Post',
    icon: 'megaphone',
    category: 'widgets',

    edit: () => {
        const [posts, setPosts] = useState(null);
    
        const [selectedPosts, setSelectedPosts] = useState([]);
        const [postTitles, setPostTitles] = useState([]);
        const [postExcerpts, setPostExcerpts] = useState([]);
        
        useEffect(() => {
            fetch('/wp-json/featured-post/v1/selected-posts')
                .then(response => response.json())
                .then(data => {
                    const dataArray = Object.values(data);
                    console.log(dataArray);
                    setSelectedPosts(dataArray.map(post => post.ID));
                    setPostTitles(dataArray.map(post => post.post_title));
                    setPostExcerpts(dataArray.map(post => post.post_content));
                    setPosts(data);
                })
                .catch(error => console.error('Error:', error));
        }, []);
    
        // If posts is null, return null (don't render anything)
        if (posts === null) {
            return null;
        }
    
        // If posts is an empty array, return 'No posts'
        if (posts.length === 0) {
            return 'No posts';
        }
        console.log(selectedPosts)
        console.log(postTitles)
        console.log(postExcerpts)
        console.log(posts);
        console.log(Object.keys(posts));


        // If posts is not null and not an empty array, map over the posts and render them
        return (
            <div className="featured-posts">
                {selectedPosts.map((post, index) => (
                    <div key={index} className="featured-post">
                        <h2 className="featured-post-title">
                            {postTitles[index]}
                        </h2>
                        <span className="featured-post-excerpt">{postExcerpts[index]}</span>
                    </div>
                ))}
            </div>
        );
    },
    /*
    
    save: ( { attributes } ) => { 
        console.log(attributes);
    
        return (
            <div className="featured-posts">
                    <div className="featured-post" >
                        <h2 className="featured-post-title">
                            {attributes.postTitles.map(Title => Title)}
                        </h2>
                        <span className="featured-post-excerpt">{attributes.postExcerpts.map(Excerpt => Excerpt)}</span>
                    </div>
            </div>
        );
    },
    */
    
} );
