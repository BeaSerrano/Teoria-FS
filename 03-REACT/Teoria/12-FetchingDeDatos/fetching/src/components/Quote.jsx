export const Quote = ({ quote, author }) => {
    return (
        <blockquote className="blockquote px-5 py-3">
            <p>{quote}</p>
            <footer className="blockquote-footer">{author}</footer>
        </blockquote>
    )
}
