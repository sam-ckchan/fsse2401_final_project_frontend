const Gallery = ({imageUrl}: { imageUrl: string }) => {
    return (
        <section className="gallery">
            <div className="image">
                <img src={imageUrl} alt="product-pic"/>
            </div>
        </section>
    );
};

export default Gallery;