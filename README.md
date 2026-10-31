# portfolio

榎本大貴（株式会社LITALICO 執行役員／LITALICO研究所 所長／AI統括部長、任意団体「みんなのアクセス」代表）の個人ポートフォリオサイトです。

公開URL: https://enochan.github.io/portfolio/

## 構成

ビルド不要の静的サイトです。

| ファイル | 内容 |
| --- | --- |
| `index.html` | サイト本体（HTML・CSS・JavaScript をすべて含む単一ファイル） |
| `.nojekyll` | GitHub Pages で Jekyll の処理を無効にするための空ファイル |

フォントは Google Fonts の「Zen Maru Gothic」を読み込んでいます。

## ローカルでの確認方法

`index.html` をブラウザで直接開くだけで表示できます。

公開時に近い状態（`http://` 経由）で確認したい場合は、リポジトリ直下で簡易サーバーを起動します。

```sh
python3 -m http.server 8000
```

ブラウザで http://localhost:8000/ を開いてください。

## 更新の仕方

1. `index.html` を編集します。
   - タイムラインの項目は「活動のタイムライン」内の `<div class="year">` ごとに年単位でまとまっています。1項目は `<li data-type="…">` で、`data-type` は `talk`（登壇・講座）、`write`（執筆・インタビュー）、`career`（経歴）のいずれかです。絞り込みボタンはこの値で表示を切り替えます。
   - 日付は `<time datetime="2026-10-30">10.30</time>` のように、`datetime` 属性にも機械可読な形式で書きます。
   - 新しい年を追加する場合は、既存の `<div class="year">` をコピーして見出し（`<h3>`）を書き換えます。
2. ブラウザで表示を確認します。PC 幅とスマホ幅（390px 前後）の両方で、横スクロールが出ないこと、キーボード操作（Tab キー）でフォーカス位置が見えることも確かめてください。
3. `main` ブランチにコミット・プッシュすると、数分で公開サイトに反映されます。

## 公開設定（GitHub Pages）

リポジトリの Settings → Pages で、Source を「Deploy from a branch」、Branch を「main」「/ (root)」にして保存します。
