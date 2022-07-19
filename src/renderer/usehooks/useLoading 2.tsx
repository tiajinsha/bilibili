import React from 'react';

const useLoading = (ref) => {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    if (!ref.current) {
      return () => { }
    }
    const node = ref.current;
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setLoading(false);
          observer.unobserve(entry.target);
        }
      });
    });
    if (node != null) {
      observer.observe(node);
    }

    return () => {
      observer.disconnect();
    }
  }, [ref]);
  return loading;
}

export default useLoading;