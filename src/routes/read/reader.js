export const GOOGLE_READER_SYNC = `
    <script async type="application/javascript"
        src="https://news.google.com/swg/js/v1/swg-basic.js"></script>
<script>
  (self.SWG_BASIC = self.SWG_BASIC || []).push( basicSubscriptions => {
    basicSubscriptions.init({
      type: "NewsArticle",
      isPartOfType: ["Product"],
      isPartOfProductId: "CAowjPmxDA:openaccess",
      clientOptions: { theme: "light", lang: "en" },
    });
  });
</script>`
