namespace RegExTool.Models {

    public class RegexModel {
        public string Expression { get; set; }
        public string Text { get; set; }
    }

    public class RegExMatch {
        public int start { get; set; }
        public int end { get; set; }
    }
}