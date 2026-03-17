import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ComponentCard from "../components/ComponentCard";
import { getComponents, getCategories, getComponentsCount } from "../api";
import { Sparkles, TrendingUp } from "lucide-react";
import "./HomePage.css";

function HomePage() {
  const [components, setComponents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [componentsCount, setComponentsCount] = useState(0);
  const [loadingPage, setLoadingPage] = useState(null);

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // ====== ВСЕ ФУНКЦИИ ОБЪЯВЛЯЕМ СНАЧАЛА ======

  const loadCategories = async () => {
    const cats = await getCategories();
    setCategories(cats);
  };

  const loadComponentsCount = async () => {
    const count = await getComponentsCount();
    setComponentsCount(count);
  };

  const loadComponents = async (pageNum = 1, reset = false) => {
    if (!reset && loadingMore) {
      console.log("⏳ Уже грузится, пропускаем");
      return;
    }

    try {
      const data = await getComponents(selectedCategory, pageNum);

      if (reset) {
        setComponents(data || []);
        setPage(2);
      } else {
        setComponents((prev) => [...prev, ...(data || [])]);
        setPage(pageNum + 1);
      }

      setHasMore(data?.length === 20);
    } catch (error) {
      console.error("Ошибка загрузки:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setLoadingPage(null);
    }
  };

  // ====== ТЕПЕРЬ useEffect ======

  useEffect(() => {
    loadCategories();
    loadComponentsCount();
  }, []);

  useEffect(() => {
    setPage(1);
    setComponents([]);
    setHasMore(true);
    loadComponents(1, true);
  }, [selectedCategory]);

  useEffect(() => {
    if (
      inView &&
      !loading &&
      !loadingMore &&
      hasMore &&
      components.length > 0 &&
      loadingPage !== page
    ) {
      setLoadingMore(true);
      setLoadingPage(page);
      loadComponents(page, false);
    }
  }, [
    inView,
    loading,
    loadingMore,
    hasMore,
    components.length,
    page,
    loadingPage,
  ]);

  // ====== ВОЗВРАЩАЕМ JSX ======

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">
            Ежедневные UI-компоненты <br /> на чистом CSS
          </h1>
          <p className="hero-subtitle">
            Новые компоненты ежедневно. Бесплатно, чистый код (HTML + CSS),
            никаких шаблонов. Просто копируй и используй.
          </p>

          <div className="hero-stats">
            <div className="stat">
              <Sparkles size={20} />
              <span>{componentsCount}+ компонентов</span>
            </div>
            <div className="stat">
              <TrendingUp size={20} />
              <span>Обновление каждые 24ч</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="filters-header">
          <h2>Все компоненты</h2>
          <div className="filters">
            <button
              className={`filter-btn ${selectedCategory === "all" ? "active" : ""}`}
              onClick={() => setSelectedCategory("all")}
            >
              Все
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {components.length === 0 && !loading ? (
          <div className="no-components">Нет компонентов в этой категории</div>
        ) : (
          <>
            <div className="components-grid">
              {components.map((comp) => (
                <ComponentCard key={comp.id} component={comp} />
              ))}
            </div>

            {/* Триггер для подгрузки */}
            {hasMore && components.length > 0 && (
              <div
                ref={loadMoreRef}
                style={{ height: "20px", margin: "20px 0" }}
              />
            )}

            {loadingMore && <div className="loading">Загрузка ещё...</div>}

            {!hasMore && components.length > 0 && (
              <div className="end-message">
                <p>🎉 Все компоненты загружены</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;
