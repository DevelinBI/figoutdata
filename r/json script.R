

library(jsonlite)

setwd("C:/xampp/htdocs/develindb2/data")

# Import data from json file
data <- fromJSON("test1.txt" )


txt<-data[1,7]

library(stringi)

txtL<-stri_trans_tolower(txt)

library(quanteda)

toks<-tokens(txtL)

toks<-tokens_wordstem(toks)

sw<-stopwords("english")

toks<-tokens_remove(toks, sw)

# Creating a DTM in one step

txt1<-data[1,7]
txt2<-data[2,7]
txt3<-data[3,7]


text<-c(d1=txt1,d2=txt2, d3=txt3)

dtm <- dfm(text, tolower=TRUE, stem=TRUE, remove_punct=TRUE, remove=stopwords("english"))
# dtm.df<-data.frame(my_dfm)
doc_freq<-docfreq(dtm)
dtm<-dfm_weight(dtm,"tfidf")
head(dtm)

myDict<-dictionary(list(tech=c("tech*"),business=c("job*","train*","honey*")))
dict_dtm<-dfm_lookup(dtm,myDict)
dict_dtm