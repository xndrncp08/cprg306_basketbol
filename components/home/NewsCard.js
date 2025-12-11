import Card from "../ui/Cards";

export default function NewsCard({ article }) {
  return (
    <a
      href={article.links?.web?.href || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <Card hover>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-2">{article.headline}</h3>
            <p className="text-gray-400 text-sm mb-2 line-clamp-2">
              {article.description || "Read more about this story..."}
            </p>
            <div className="flex items-center text-xs text-gray-500">
              <span>{article.categories?.[0]?.description || "NBA News"}</span>
              <span className="mx-2">•</span>
              <span>
                {article.published
                  ? new Date(article.published).toLocaleDateString()
                  : "Recent"}
              </span>
            </div>
          </div>
          {article.images?.[0]?.url && (
            <div className="ml-4 flex-shrink-0">
              <div className="w-24 h-24 bg-gray-700 rounded-lg overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${article.images[0].url})` }}
                />
              </div>
            </div>
          )}
        </div>
      </Card>
    </a>
  );
}
