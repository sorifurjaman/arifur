class Artwork {
  final String id;
  final String title;
  final String category;
  final String medium;
  final String year;
  final String dimensions;
  final String imageUrl;
  final String audioUrl;
  final String description;
  final String audioTitle;
  final String audioDuration;
  final double? price;
  final bool isFeatured;
  final bool isAvailable;

  const Artwork({
    required this.id,
    required this.title,
    required this.category,
    required this.medium,
    required this.year,
    required this.dimensions,
    required this.imageUrl,
    required this.audioUrl,
    required this.description,
    required this.audioTitle,
    required this.audioDuration,
    this.price,
    this.isFeatured = false,
    this.isAvailable = true,
  });
}
