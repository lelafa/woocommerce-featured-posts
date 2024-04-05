import { registerBlockType } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';

registerBlockType( 'my-block/featured-post', {
    title: 'Featured Post',
    icon: 'megaphone',
    category: 'widgets',

    edit: ( { attributes, setAttributes } ) => {
        const posts = useSelect( select => {
            return select( 'core' ).getEntityRecords( 'postType', 'post', { per_page: 3 } );
        }, [] );

        if ( ! posts ) {
            return 'Loading...';
        }

        if ( posts.length === 0 ) {
            return 'No posts';
        }

        const post = posts[0];

        return (
            <div>
                <h2>{ post.title.rendered }</h2>
                <div dangerouslySetInnerHTML={ { __html: post.excerpt.rendered } } />
            </div>
        );
    },

    save: () => null,
} );
