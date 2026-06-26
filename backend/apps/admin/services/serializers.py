from rest_framework import serializers
from .models import Service, ServiceCategory, ServiceFeature

class ServiceSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.name', allow_blank=True, required=False)
    features = serializers.ListField(
        child=serializers.CharField(), required=False
    )

    class Meta:
        model = Service
        fields = ['id', 'title', 'description', 'icon', 'category', 'features', 'created_at', 'updated_at']

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['category'] = instance.category.name if instance.category else ''
        ret['features'] = [f.name for f in instance.features.all()]
        return ret

    def _handle_nested(self, instance, validated_data):
        category_name = validated_data.pop('category', None)
        if category_name is not None:
            if isinstance(category_name, dict):
                category_name = category_name.get('name', '')
            if category_name:
                cat, _ = ServiceCategory.objects.get_or_create(name=category_name)
                instance.category = cat
            else:
                instance.category = None
            instance.save()
            
        features = validated_data.pop('features', None)
        if features is not None:
            instance.features.all().delete()
            for f in features:
                ServiceFeature.objects.create(service=instance, name=f)

    def create(self, validated_data):
        category_data = validated_data.pop('category', None)
        features_data = validated_data.pop('features', None)
        
        instance = super().create(validated_data)
        
        self._handle_nested(instance, {
            'category': category_data,
            'features': features_data
        })
        return instance

    def update(self, instance, validated_data):
        category_data = validated_data.pop('category', None)
        features_data = validated_data.pop('features', None)
        
        instance = super().update(instance, validated_data)
        
        self._handle_nested(instance, {
            'category': category_data,
            'features': features_data
        })
        return instance
